const express = require("express");
const router = express.Router();
const adminsignup = require("../Controllers/Admin/Adminsignup");
const adminlogin = require("../Controllers/Admin/Adminlogin");
const verifyadminpage = require("../middleware/adminmiddleware");

router.post("/api/adminpage/signup", adminsignup);
router.post("/api/adminpage/login", adminlogin);

module.exports = router;
