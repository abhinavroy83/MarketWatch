const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const forgetPassword = async (req, res) => {
  try {
    const mail = req.body.email;
    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.json({ status: false, message: "User not found" });
    } else {
      const jwttoken = jwt.sign(
        { user: user.toJSON() },
        process.env.JWTSECRETKEY,
        {
          expiresIn: "10m",
        }
      );
      await sendemailverification(mail, jwttoken);
      return res.json({ status: true, message: "Verification email sent" });
    }
  } catch (error) {
    res.json({
      msg: "Error while ",
    });
    return res.status(500).json({
      status: "failed",
      msg: "An error occurred while processing your request",
    });
  }
};

const resetpassword = async (req, res) => {
  // console.log(req.params.token);
  try {
    const decodetoken = jwt.verify(req.params.token, process.env.JWTSECRETKEY);
    console.log(decodetoken.user._id);
    if (!decodetoken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findOne({ _id: decodetoken.user._id });
    if (user) {
      const salt = await bcrypt.genSalt(10);
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

      user.password = req.body.newPassword;
      await user.save();
    }
    res.status(200).send({ message: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error while update password" });
  }
};

async function sendemailverification(email, token) {
  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "7f1dff9b3ce3afe2e2b65a3c693f927b",
    },
  });

  await transport.sendMail({
    from: "noreply@verydesi.com",
    to: email,
    subject: "Reset Password",
    html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="https://verydesi.com/reset-password/${token}">https://verydesi.com/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
  });
}

module.exports = { forgetPassword, resetpassword };
