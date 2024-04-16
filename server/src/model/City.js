const mongoose = require("mongoose");
const Admin = require("../model/Admin");
const { Schema } = mongoose;

const cityschema = new mongoose.Schema({
  AdminID: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    require: true,
  },
  country: {
    type: String,
    require: true,
    enum: ["Usa"],
  },
  state: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  subarea: {
    type: String,
    // require: true,
  },
  zipcode: {
    type: String,
  },
  area: {
    type: String,
  },
});

const City = mongoose.model("city", cityschema);
module.exports = City;
