const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const IsloggedIn = require("./src/middleware/isloggedin");
const cloudinary = require("cloudinary");
const Multer = require("multer");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
require("./src/Config/Passport");

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
      "https://verydesi.com",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://copy-market-watch.vercel.app",
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

cloudinary.config({
  cloud_name: "druohnmyv",
  api_key: "362627323663318",
  api_secret: "YFYPQAtq-5xXddsrIl1sTEQ3siI",
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    transformation: [
      { width: 1000, crop: "scale" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });
  return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/img/upload", upload.array("my_files", 5), async (req, res) => {
  try {
    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      return await handleUpload(dataURI);
    });

    const uploadResults = await Promise.all(uploadPromises);
    res.json(uploadResults);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running on localhost ${process.env.PORT}`);
});
