const nodemailer = require("nodemailer");
const User = require("../../model/user");
const jwt = require("jsonwebtoken");

const verifyemail = async (req, res) => {
  try {
    const { jwttoken } = req.params;

    const decoded = jwt.verify(jwttoken, process.env.JWTSECRETKEY);
    const userEmail = decoded.email;
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: { isVerified: true } }
    );
    if (updatedUser) {
      return res.redirect("https://verydesi.com");
    } else {
      return res.status(404).send("User not found.");
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).send("Invalid or expired token.");
  }
};

module.exports = verifyemail;
