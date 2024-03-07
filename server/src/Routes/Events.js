const express = require("express");
const router = express.Router();
const isloggedin = require("../middleware/isloggedin");
const addevent = require("../Controllers/Events/addevents");
const getevent = require("../Controllers/Events/getevents");

router.post("/api/addevents", isloggedin, addevent);
router.get("/api/getevents", getevent);
module.exports = router;
