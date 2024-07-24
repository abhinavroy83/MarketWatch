const mongoose = require("mongoose");
const User = require("../model/user");
const { Schema } = mongoose;

const roomSchema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postedon: { type: Date, default: Date.now },
  Title: { type: String },
  postingincity: { type: String },
  Description: { type: String },
  Propertytype: { type: String },
  city: { type: String },
  Stay_lease: { type: String },
  Avaliblity_from: { type: String },
  Available_to: { type: String },
  Day_Available: { type: String },
  Attchd_Bath: { type: String },
  Preferred_gender: { type: String },
  Expected_Rooms: { type: Number },
  Pricemodel: { type: String },
  Bath_Location: { type: String },
  Couples_welcome: { type: String },
  Desposite: { type: Number },
  is_room_furnished: { type: String },
  Amenities_include: { type: [String] },
  Vegeterian_prefernce: { type: String },
  Smoking_policy: { type: String },
  Pet_friendly: { type: String },
  Open_house_schedule: { type: String },
  Imgurl: { type: [String] },
  user_name: { type: String },
  phone_number: { type: String },
  address: { type: String },
  state: { type: String },
  zip_code: { type: String },
  email: { type: String },
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
