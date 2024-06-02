const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const IsloggedIn = require("./src/middleware/isloggedin");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();

//cors

app.use(
  cors({
    origin: [
      "https://market-watch-woad.vercel.app",
      "http://localhost:5174",
      "https://main.d1iwqvmzn1plk4.amplifyapp.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: "*",
  })
);
app.options("*", cors());

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

app.listen(process.env.PORT, () => {
  console.log(`server running on localhost ${process.env.PORT}`);
});
