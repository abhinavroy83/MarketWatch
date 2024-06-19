const express = require("express");
const Router = express.Router();
const verifyAdminPage = require("../middleware/adminmiddleware");
const {
  postcity,
  getcity,
  findsuburbs,
  deletesub,
} = require("../Controllers/City/City");

Router.post("/api/admin/postcity", verifyAdminPage, postcity);
Router.get("/api/admin/getallcity", getcity);
Router.get("/api/admin/area/:area_name", findsuburbs);
Router.delete("/api/admin/deletesub/:id", deletesub);

module.exports = Router;
