const User = require("../../model/user");
const bcrypt = require("bcrypt");

const singup = async (req, res) => {
  try {
    const {
      email,
      password,
      displaybussinessname,
      legalbussinesname,
      lastName,
      bussinessac,
      firstName,
      website,
      country,
      address,
      city,
    } = req.body;
    const encrytpass = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      lastName,
      bussinessac,
      legalbussinesname,
      address,
      firstName,
      website,
      displaybussinessname,
      country,
      city,
      password: encrytpass,
    });
    await newUser.save();
    res.json({
      status: "Success",
      msg: "Successfully signup",
    });
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

module.exports = singup;
