const express = require("express");
const router = express.Router();
const adminsignup = require("../Controllers/Admin/Adminsignup");
const adminlogin = require("../Controllers/Admin/Adminlogin");

router.post("/api/adminpage/signup", adminsignup);
router.post("/api/adminpage/login", adminlogin);
module.exports = router;
