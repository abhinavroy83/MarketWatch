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
    enum: ["Usa", "Canada"],
  },
  state: {
    type: [String],
    require: true,
  },
  primaryState: {
    type: String,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
  subarea: {
    type: [String],
    // require: true,
  },
  zipcode: {
    type: [String],
  },
});

const City = mongoose.model("city", cityschema);
module.exports = City;
