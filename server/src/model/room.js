const mongoose = require("mongoose");
const User = require("../model/user");
const { Schema } = mongoose;

const roomSchema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  city: { type: String, required: true },
  State: { type: String, required: true },
  Hotelname: { type: String, required: true },
  PrdImage: { type: String, required: true },
  rent: { type: String, required: true },
  address: { type: String, required: true },
  bed: { type: String, required: true },
  bath: { type: String, required: true },
  postedby: { type: String, required: true },
  description: { type: String, required: true },
  postedon: { type: Date, default: Date.now },
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
const Room = mongoose.model("room", roomSchema);

module.exports = Room;
