const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistschema = mongoose.Schema({
  UserId: { type: Schema.Types.ObjectId },
  rooms: [
    {
      roomId: { type: String, required: true },
      status: { type: Boolean, required: true },
    },
  ],
});

const Wishlistmodal = mongoose.model("wishlist", wishlistschema);

module.exports = Wishlistmodal;
