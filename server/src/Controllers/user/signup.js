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
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c54cb5a4091909",
      pass: "9cf3912f1f618f",
    },
  });

  await transport.sendMail({
    from: "your@example.com",
    to: email,
    subject: "Email Verification",
    text: `Click this link to verify your email:  https://marketwatch-e3hc.onrender.com/user/verifyemail/${jwttoken}`,
  });
}

module.exports = singup;
