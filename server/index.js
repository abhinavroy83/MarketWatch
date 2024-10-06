const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const IsloggedIn = require("./src/middleware/isloggedin");
const cloudinary = require("cloudinary");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const AWS = require("aws-sdk");
require("./src/Config/Passport");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

//cors
app.use(
  cors({
    origin: [
      "https://market-watch-woad.vercel.app",
      "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:3000",
      "https://verydesi.com",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://copy-market-watch.vercel.app",
      "https://design.verydesi.com",
      "http://18.237.230.139:8000/",
      "http://ec2-18-237-230-139.us-west-2.compute.amazonaws.com"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: "*",
  })
);
app.options("*", cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "132ewadfeswfsdfds",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//connection
const connectiondb = require("./src/db/dbcongif");
connectiondb();

//routes
const user = require("./src/Routes/user");
const room = require("./src/Routes/room");
const job = require("./src/Routes/Job");
const business = require("./src/Routes/Bussiness");
const event = require("./src/Routes/Events");
const movie = require("./src/Routes/Movie");
const admin = require("./src/Routes/Admin");
const approval = require("./src/Routes/Approval");
const city = require("./src/Routes/City");
const wish = require("./src/Routes/wishlist");
const authRoutes = require("./src/Routes/Auth");
const help = require("./src/Routes/Help");

app.use("/api", authRoutes);
app.use("/user", user);
app.use(room);
app.use(job);
app.use(business);
app.use(event);
app.use(movie);
app.use(admin);
app.use(approval);
app.use(city);
app.use(wish);
app.use(help);

//healt check

app.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({
      status: "failed",
    });
    console.log(error);
  }
});

const verifyadminpage = require("./src/middleware/adminmiddleware");
app.get("/dashboard", verifyadminpage, (req, res) => {
  try {
    const user = req.user.user._id;
    res.json({
      Status: "Success",
      msg: "you haved logged success",
      user,
    });
  } catch (error) {
    res.json({
      status: "Failed",
    });
  }
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const uploadToS3 = async (file) => {
  try {
    // Creating a unique filename
    const fileName = `${Date.now()}_${file.originalname}`;

    // AWS S3 upload using lib-storage (for multipart uploads)
    const parallelUpload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name from environment
        Key: fileName, // File name in the S3 bucket
        Body: file.buffer, // File content as a buffer
        ContentType: file.mimetype, // Set MIME type
      },
    });

    // Await upload completion
    const result = await parallelUpload.done();

    // Return the CloudFront URL (or S3 URL if CloudFront is not configured)
    const cloudFrontUrl = `${process.env.CLOUDFRONT_URL}/${fileName}`;
    return cloudFrontUrl; // Return the CloudFront URL of the uploaded file
  } catch (error) {
    console.error("Error uploading to S3:", error.message);
    throw new Error("S3 upload failed");
  }
};

app.post("/img/upload", upload.array("my_files", 5), async (req, res) => {
  try {
    const uploadPromises = req.files.map((file) => uploadToS3(file)); // Upload each file
    const uploadedFiles = await Promise.all(uploadPromises); // Wait for all uploads to complete

    res.json({ urls: uploadedFiles }); // Send the uploaded file URLs back to the client
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/img/delete", async (req, res) => {
  const { fileKey } = req.body;
  if (!fileKey) {
    return res.status(400).send({ message: "File key is required" });
  }
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
      })
    );

    res.status(200).send({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error.message);
    res.status(500).send({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running on localhost ${process.env.PORT}`);
});
