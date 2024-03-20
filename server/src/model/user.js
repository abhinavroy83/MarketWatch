const mongoose = require("mongoose");

const usershema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    enum: ["Usa", "India"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bussinessac: {
    type: String,
    required: true,
    enum: ["yes", "no"],
  },
  password: {
    type: String,
    required: true,
  },
  displaybussinessname: {
    type: String,
  },
  legalbussinesname: {
    type: String,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
});

const User = mongoose.model("user", usershema);
module.exports = User;
