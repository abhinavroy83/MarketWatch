const jwt = require("jsonwebtoken");

const verifyAdminPage = (req, res, next) => {
  try {
    const { jwttoken } = req.headers;
    const user = jwt.verify(jwttoken, process.env.JWTSECRETKEY);
    req.user = user;
    const userRole = user.role;
    if (
      userRole === "Admin" ||
      userRole === "Manager" ||
      userRole === "CustomerSupport"
    ) {
      next();
    } else {
      return res.status(403).json({
        status: "failed",
        msg: "You do not have permission to perform this action",
      });
    }
  } catch (error) {
    console.error("Error in verifyAdminPage middleware:", error);
    res.status(500).json({
      status: "failed",
      msg: "Internal server error",
    });
  }
};

module.exports = verifyAdminPage;
