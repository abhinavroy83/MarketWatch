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
      await sendemailverification(email, jwttoken);
      res.json({
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

async function sendemailverification(email, jwttoken) {
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
    subject: "Email Verification",
    html: `<h1>click on the below link to verify</h1>
    <p>Click this link to verify your email:</p>
    <a href="https://api.verydesi.com/user/verifyemail/${jwttoken}">https://api.verydesi.com/user/verifyemail/${jwttoken}</a>`,
  });
}

module.exports = singup;
