const express = require("express");
const router = express.Router();
const adminsignup = require("../Controllers/Admin/Adminsignup");
const adminlogin = require("../Controllers/Admin/Adminlogin");
const verifyadminpage = require("../middleware/adminmiddleware");
const findalluser = require("../Controllers/Admin/User/Alluser");
const {
  deleteuser,
  deleteuserbyalldata,
} = require("../Controllers/Admin/User/deleteuser");
const deleteroom = require("../Controllers/Admin/Room/deleteroom");
const {
  getallBusiness,
  getallBusinessbycity,
} = require("../Controllers/Admin/Bussiness/Allbussiness");
const {
  getadminallroom,
  getadminallroombycity,
} = require("../Controllers/Admin/Room/Allrooms");
const deletebusiness = require("../Controllers/Admin/Bussiness/deleteroom");

//user
router.post("/api/adminpage/signup", adminsignup);
router.post("/api/adminpage/login", adminlogin);
router.get("/api/admin/alluser", findalluser);
router.delete("/api/admin/deleteuser/:_id", deleteuser);
router.delete("/api/admin/deleteuserwithdata/:_id", deleteuserbyalldata);

//rooms
router.get("/api/admin/getallrooms", getadminallroom);
router.get("/api/admin/getroombycity/:city", getadminallroombycity);
router.delete("/api/admin/deleteroom/:_id", deleteroom);

//business

router.get("/api/admin/getallbussiness", getallBusiness);
router.get("/api/admin/getallbussiness/:city", getallBusinessbycity);
router.delete("/api/admin/deletebusiness/:_id", deletebusiness);

module.exports = router;
