const express = require("express");
const Router = express.Router();
const verifyAdminPage = require("../middleware/adminmiddleware");
const { postcity, getcity } = require("../Controllers/City/City");

Router.post("/api/admin/postcity", verifyAdminPage, postcity);
Router.get("/api/admin/getallcity", getcity);

module.exports = Router;

