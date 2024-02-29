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
app.use(cors());

//connection
const connectiondb = require("./src/db/dbcongif");
connectiondb();

//routes
const user = require("./src/Routes/user");
const room = require("./src/Routes/room");
const job = require("./src/Routes/Job");
const business = require("./src/Routes/Bussiness");
const admin = require("./src/Routes/Admin");

app.use("/user", user);
app.use(room);
app.use(job);
app.use(business);
app.use(admin);

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

app.get("/dashboard", IsloggedIn, (req, res) => {
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
  console.log("server running on localhost http://localhost:8000");
});
