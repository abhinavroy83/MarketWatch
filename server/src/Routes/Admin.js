const express = require("express");
const router = express.Router();
const adminsignup = require("../Controllers/Admin/Adminsignup");
const adminlogin = require("../Controllers/Admin/Adminlogin");
const verifyadminpage = require("../middleware/adminmiddleware");
const findalluser = require("../Controllers/Admin/User/Alluser");
const deleteuser = require("../Controllers/Admin/User/deleteuser");
const deleteroom = require("../Controllers/Admin/Room/deleteroom");
const {
  getadminallroom,
  getadminallroombycity,
} = require("../Controllers/Admin/Room/Allrooms");

router.post("/api/adminpage/signup", adminsignup);
router.post("/api/adminpage/login", adminlogin);
router.get("/api/admin/alluser", findalluser);
router.delete("/api/admin/deleteuser/:_id", deleteuser);

//rooms
router.get("/api/admin/getallrooms", getadminallroom);
router.get("/api/admin/getroombycity/:city", getadminallroombycity);
router.delete("/api/admin/deleteroom/:_id", deleteroom);

module.exports = router;
