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
router.get(`/api/getlistbyroom/:roomId`, IsloggedIn, findwishlistwithroomid);
router.delete("/api/deletelist/:userid", IsloggedIn, deletelist);

module.exports = router;
