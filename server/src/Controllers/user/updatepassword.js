const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const updatepassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "user not found",
      });
    }

    const ispasswordmatch = await bcrypt.compare(oldpassword, user.password);
    if (ispasswordmatch) {
      const updatedpass = await bcrypt.hash(newpassword, 10);
      user.password = updatedpass;
      await user.save();
      await sendemailverification(user.email, user.firstName);
      res.json({
        status: true,
        msg: "Password updated successfully",
      });
    } else {
      res.json({
        status: false,
        msg: "Invalid old password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error while updating password" });
  }
};

async function sendemailverification(email, username) {
  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "7f1dff9b3ce3afe2e2b65a3c693f927b",
    },
  });

  await transport.sendMail({
    from: "verydesi.com",
    to: email,
    subject: "Password Change Successful",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #4CAF50;">
          Password Change Confirmation
        </h1>
        <p>Dear <strong>${username}</strong>,</p>
        <p>Your password has been successfully updated.</p>
        <p>If you didn't request this change, please contact our support team immediately.</p>
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

module.exports = updatepassword;
