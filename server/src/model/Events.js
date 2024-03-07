const mongoose = require("mongoose");
const User = require("../model/user");
const { Schema } = mongoose;

const eventschema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  img: { type: String, required: true },
  city: { type: String, required: true },
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

eventschema.index({ location: "2dsphere" });
const Event = mongoose.model("Event", eventschema);
module.exports = Event;