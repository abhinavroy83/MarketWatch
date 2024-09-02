const mongoose = require("mongoose");

const usershema = new mongoose.Schema({
  isVerified: {
    type: Boolean,
    default: false,
  },  
  belongcity: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
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
  googleId: {
    type: String,
    unique: true,
  },
  appleId: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  joinedon: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", usershema);
module.exports = User;
