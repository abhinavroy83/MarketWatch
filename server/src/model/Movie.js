const mongoose = require("mongoose");
const User = require("../model/user");
const { Schema } = mongoose;

const movieschema = mongoose.Schema({
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

movieschema.index({ location: "2dsphere" });
const Movie = mongoose.model("Movie", movieschema);
module.exports = Movie;
