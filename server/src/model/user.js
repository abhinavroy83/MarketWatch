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
  country: {
    type: String,
    enum: ["Usa", "India"],
    // required: true,
  },
  city: {
    type: String,
    // required: true,
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
