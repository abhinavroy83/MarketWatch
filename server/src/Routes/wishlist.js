const express = require("express");
const router = express.Router();
const {
  postwistlist,
  findwishlist,
  deletelist,
  findwishlistwithroomid,
} = require("../Controllers/Wistlist/wishlist");
const IsloggedIn = require("../middleware/isloggedin");

router.post("/api/addtowish", IsloggedIn, postwistlist);
router.get(`/api/getlist/:UserId`, findwishlist);
router.get(`/api/getlistbyroom/:roomId`, findwishlistwithroomid);
router.delete("/api/deletelist/:userid", deletelist);

module.exports = router;
