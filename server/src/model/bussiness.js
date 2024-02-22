const mongoose = require("mongoose");
const User = require("../model/user");
const { Schema } = mongoose;

const bussinessSchema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  Image: { type: String, required: true },
  business_name: { type: String, required: true },
  address1: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  business_category: { type: String, required: true },
  hours_open: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

roomSchema.index({ location: "2dsphere" });
const Business = mongoose.model("business", bussinessSchema);

module.exports = Business;
