const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotenv.config();
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

app.listen(process.env.PORT, () => {
  console.log("server running on localhost http://localhost:8000");
});
