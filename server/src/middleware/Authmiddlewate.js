const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    
  } catch (error) {
    res.json({
      status: "failed",
      msg: "you havent login",
    });
  }
};
