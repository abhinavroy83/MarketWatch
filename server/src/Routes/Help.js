const { posthelpmsg, gethelpmsg } = require("../Controllers/Help/Help");
const router = require("./Admin");

router.post("/api/adminpage/sendmsg", posthelpmsg);
router.get("/api/admin/gethepmessages", gethelpmsg);

module.exports = router;
