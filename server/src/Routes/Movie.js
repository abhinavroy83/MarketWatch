const express = require("express");
const router = express.Router();
const addmovie = require("../Controllers/Movie/addmovie");
const getmovie = require("../Controllers/Movie/getmovie");
const isloggedin = require("../middleware/isloggedin");

router.post("/api/addmovie", isloggedin, addmovie);
router.get("/api/getmovie", getmovie);

module.exports = router;
