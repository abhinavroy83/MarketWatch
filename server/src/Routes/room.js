const express = require("express");
const router = express.Router();
const addroom = require("../Controllers/Rooms/Addrooms");
const getroomforspeficuser = require("../Controllers/Rooms/Getroom");
const getroombycurrentlocation = require("../Controllers/Rooms/Getroombyloc");
const IsloggedIn = require("../middleware/isloggedin");

router.post("/api/addrooms", IsloggedIn, addroom);
router.get("/api/getrooms/:userID", getroomforspeficuser);
router.get("/api/getallrooms", getroombycurrentlocation);
module.exports = router;
 