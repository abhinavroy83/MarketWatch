const Admin = require("../../model/Admin");
const bcrypt = require("bcrypt");

const adminsignup = async (req, res) => {
  try {
    const { username, uniqueid, password, role } = req.body;
    const encrytpass = await bcrypt.hash(password, 10);
    const newUser = new Admin({
      username,
      uniqueid,
      password,
      role,
      password: encrytpass,
    });
    await newUser.save();
    res.json({
      status: "success",
      msg: "Successfully deatils added",
    });
  } catch (error) {
    console.log(error);
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

module.exports = adminsignup;
