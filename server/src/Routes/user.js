const express = require("express");
const router = express.Router();
const signup = require("../Controllers/user/signup");
const login = require("../Controllers/user/login");
const findspecifcuser = require("../Controllers/user/finduser");
const updateuser = require("../Controllers/user/updateuser");
const verifyemail = require("../Controllers/user/verifyuser");

router.post("/signup", signup);
router.post("/login", login);
router.get(`/dashboard/profile/:_id`, findspecifcuser);
router.put(`/updateuser/:_id`, updateuser);
router.get(`/verifyemail/:jwttoken`, verifyemail);

module.exports = router;
