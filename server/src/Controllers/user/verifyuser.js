const nodemailer = require("nodemailer");
const User = require("../../model/user");
const jwt = require("jsonwebtoken");

const verifyemail = async (req, res) => {
  try {
    const { jwttoken } = req.params;

    const decoded = jwt.verify(jwttoken, process.env.JWTSECRETKEY);
    const userEmail = decoded.email;
    await User.findOneAndUpdate(
      { email: userEmail },
      { $set: { isVerified: true } }
    );
    res.send("Email verify succesfully");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).send("Invalid or expired token.");
  }
};

module.exports = verifyemail;
