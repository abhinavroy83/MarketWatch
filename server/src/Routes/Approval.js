const express = require("express");
const router = express.Router();
const verifyadminpage = require("../middleware/adminmiddleware");
const {
  createapproval,
  getapprovalrequest,
  approvaluser,
} = require("../Controllers/Admin/Approval/Approvuser");

router.post("/api/admin/createapproval", verifyadminpage, createapproval);
router.get("/api/admin/getapprovalrequest", getapprovalrequest);
router.put("/api/admin/approvrequest/:_id", approvaluser);

module.exports = router;
