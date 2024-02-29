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
    res.json({
      status: "failed",
    });
  }
};

module.exports = adminsignup;
