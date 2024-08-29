const {
  posthelpmsg,
  gethelpmsg,
  deletemsg,
} = require("../Controllers/Help/Help");
const router = require("./Admin");

router.post("/api/adminpage/sendmsg", posthelpmsg);
router.get("/api/admin/gethepmessages", gethelpmsg);
router.delete("/api/admin/deletemsg/:_id", deletemsg);

module.exports = router;
