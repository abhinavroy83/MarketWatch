const mongoose = require("mongoose");

const helpmodel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  user_phone_number: {
    type: String,
  },
  msg: {
    type: String,
    required: true,
  },
});

const Help = mongoose.model("help", helpmodel);
module.exports = Help;
