const express = require("express");
const router = express.Router();
const addbusiness = require("../Controllers/Bussiness/Addbussiness");
const Getbusinessforspecficuser = require("../Controllers/Bussiness/Getbussiness");
const Getbussinessbyloc = require("../Controllers/Bussiness/Getbussinessbyloc");
const getspecficbusiness = require("../Controllers/Bussiness/GetSpecificbusiness");
const IsloggedIn = require("../middleware/isloggedin");

router.post("/api/addbussiness", IsloggedIn, addbusiness);
router.get("/api/getbussinesslist/:userID", Getbusinessforspecficuser);
router.get("/api/getbusinessbyloc", Getbussinessbyloc);
router.get("/api/getspecificbuss/:ID", getspecficbusiness);

module.exports = router;
