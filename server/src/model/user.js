const mongoose = require("mongoose");

const usershema = new mongoose.Schema({
  isVerified: {
    type: Boolean,
    default: false,
  },
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
  phone_number: {
    type: Number,
    required: true,
  },
  userimg: {
    type: String,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "notspecified"],
  },
  country: {
    type: String,
    enum: ["Usa"],
    // required: true,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
  },
  pin: {
    type: String,
  },
  bussinessac: {
    type: String,
    // required: true,
    enum: ["yes", "no"],
    default: "no",
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", usershema);
module.exports = User;
