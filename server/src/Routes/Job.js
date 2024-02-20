const express = require("express");
const router = express.Router();
const addjob = require("../Controllers/Job/addjob");
const getjobforuser = require("../Controllers/Job/getjobforuser");
const getjobbycurrentloc = require("../Controllers/Job/getjobbyloc");
const deleteroom=require('../Controllers/Rooms/Delete')
const IsloggedIn = require("../middleware/isloggedin");

router.post("/api/addjob", IsloggedIn, addjob);
router.get("/api/getjob/:userID", getjobforuser);
router.get("/api/job/getalljobs", getjobbycurrentloc);
router.delete('/api/deleteroom/:roomsID',deleteroom)

module.exports = router;
