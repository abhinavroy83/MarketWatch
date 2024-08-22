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
      await sendemailverification(mail, jwttoken, user.firstName);
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

async function sendemailverification(email, token, username) {
  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "7f1dff9b3ce3afe2e2b65a3c693f927b",
    },
  });

  await transport.sendMail({
    from: "no-reply@verydesi.com",
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #ff5722;">
          Password Reset Request
        </h1>
        <p>Dear <strong>${username}</strong>,</p>
        <p>We received a request to reset your password. Click the link below to proceed:</p>
        <p style="text-align: center;">
          <a href="https://verydesi.com/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: #ff5722; color: #fff; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-wrap: break-word;">
          <a href="https://verydesi.com/reset-password/${token}">
            https://verydesi.com/reset-password/${token}
          </a>
        </p>
        <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p style="color: #999; font-size: 12px; text-align: center;">
          This is an automated email, please do not reply.
        </p>
        <p style="color: #999; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} VeryDesi. All rights reserved.
        </p>
      </div>
    `,
  });
}

module.exports = { forgetPassword, resetpassword };
