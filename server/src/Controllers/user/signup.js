const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const singup = async (req, res) => {
  try {
    const {
      isVerified,
      email,
      phone_number,
      password,
      lastName,
      bussinessac,
      firstName,
      country,
      city,
    } = req.body;
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res.json({ status: false, message: "email already exists" });
    }
    const encrytpass = await bcrypt.hash(password, 10);
    const joinedon = new Date().toISOString().split("T")[0];
    const newUser = new User({
      isVerified,
      email,
      phone_number,
      lastName,
      bussinessac,
      firstName,
      country,
      city,
      password: encrytpass,
      joinedon,
    });
    const ress = await newUser.save();
    if (ress) {
      const jwttoken = jwt.sign({ email }, process.env.JWTSECRETKEY);
      await sendemailverification(email, jwttoken, newUser.firstName);
      return res.json({
        cnfstatus: true,
        data: newUser,
        status: "User registered successfully. Please verify your email.",
        jwttoken,
        msg: "Successfully signup",
      });
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      return res.status(400).json({
        status: "failed",
        msg: "Username is already Exits",
      });
    } else {
      return res.status(500).json({
        status: "failed",
        msg: "An error occurred while processing your request",
      });
    }
  }
};

async function sendemailverification(email, jwttoken, username) {
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
    subject: "Email Verification",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="background-color: #f8f8f8; padding: 10px 20px; border-bottom: 2px solid #e2e2e2; text-align: center; color: #ff5722;">
          Verydesi.com
        </h1>
        <p>Dear <strong>${username}</strong>,</p>
        <p>Thank you for registering up on VeryDesi.com! To activate your account and start exploring, please click the verification link below:</p>
        <p style="text-align: center;">
          <a href="https://api.verydesi.com/user/verifyemail/${jwttoken}" style="display: inline-block; padding: 10px 20px; background-color: #ff5722; color: #fff; text-decoration: none; border-radius: 5px;">
            verify email
          </a>
        </p>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="word-wrap: break-word;">
          <a href="https://api.verydesi.com/user/verifyemail/${jwttoken}">
            https://api.verydesi.com/user/verifyemail/${jwttoken}
          </a>
        </p>
        <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
        <p style="color: #999; font-size: 12px; text-align: center;">
          This is an automated email, please do not reply.
        </p>
        <p style="color: #999; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} VeryDesi. All rights reserved.
        </p>
      </div>`,
  });
}

module.exports = singup;
