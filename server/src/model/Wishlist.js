const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistschema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId },
  roomId: { type: String, require: true },
  status: { type: Boolean, require: true },
});

const Wishlistmodal = mongoose.model("wishlist", wishlistschema);

module.exports = Wishlistmodal;

