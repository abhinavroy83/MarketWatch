const mongoose = require("mongoose");
const User = require("../model/user");
const { Schema } = mongoose;

const jobschema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  company_name: { type: String, required: true },
  postion: { type: String, required: true },
  company_logo: { type: String, required: true },
  jobtype: { type: String, enum: ["fulltime", "internship"], required: true },
  salary: { type: String, required: true },
  job_location: { type: String, required: true },
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

jobschema.index({ location: "2dsphere" });
const Job = mongoose.model("Job", jobschema);
module.exports = Job;
