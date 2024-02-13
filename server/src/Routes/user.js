const express = require("express");
const router = express.Router();
const signup = require("../Controllers/user/signup");
const login = require("../Controllers/user/login");

router.post("/signup", signup);
router.post("/login", login); 

module.exports = router;
