const Admin = require("../../model/Admin");
const bcrypt = require("bcrypt");

const adminlogin = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
      res.json({
        status: "failed",
        msg: "user not find",
      });
    }
    let ispassmatched = await bcrypt.compare(password, user.password);
    if (ispassmatched) {
      res.json({
        Status: "success",
        msg: "successfuly loggedIN",
        //   data: user,
      });
    }
  } catch (error) {
    console.log("Error during login", error);
    res.json({
      status: "failed",
    });
  }
};

module.exports = adminlogin;
