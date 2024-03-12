const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../model/user");
const Admin = require("../model/Admin");

const approvalrequestSchema = mongoose.Schema({
  requestedID: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    require: true,
  }, // customer support want to delete
  userId: {
    type: String,
    // ref: "User",
    require: true,
  }, //want to delete
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Approvalrequest = mongoose.model(
  "approvalrequest",
  approvalrequestSchema
);
module.exports = Approvalrequest;
