const express = require("express");
const router = express.Router();
const addroom = require("../Controllers/Rooms/Addrooms");
const getroomforspeficuser = require("../Controllers/Rooms/Getroom");
const getroombycurrentlocation = require("../Controllers/Rooms/Getroombyloc");
const getspecficroom = require("../Controllers/Rooms/GetSpecificroom");
const deleterooms = require("../Controllers/Rooms/Delete");
const IsloggedIn = require("../middleware/isloggedin");
const { nextroom, prvsroom } = require("../Controllers/Rooms/Nextandprvs");
const updateroom = require("../Controllers/Rooms/Editroom");

router.post("/api/addrooms", IsloggedIn, addroom);
router.get("/api/getrooms/:userID", getroomforspeficuser);
router.get("/api/getallrooms", getroombycurrentlocation);
router.get("/api/getspecificroom/:roomID", getspecficroom);
router.delete("/rooms/:roomsID", deleterooms);
router.get("/api/rooms/:roomId/next", nextroom);
router.get("/api/rooms/:roomId/previous", prvsroom);
router.put("/api/updaterooms/:_id", IsloggedIn, updateroom);
module.exports = router;
