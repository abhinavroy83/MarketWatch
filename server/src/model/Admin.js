const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  uniqueid: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Manager"],
  },
});

const Admin = mongoose.model("admin", adminschema);
module.exports = Admin;
