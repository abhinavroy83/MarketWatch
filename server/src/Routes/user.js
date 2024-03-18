const express = require("express");
const router = express.Router();
const signup = require("../Controllers/user/signup");
const login = require("../Controllers/user/login");
const findspecifcuser = require("../Controllers/user/finduser");

router.post("/signup", signup);
router.post("/login", login);
router.get(`/dashboard/profile/:_id`, findspecifcuser);

module.exports = router;
