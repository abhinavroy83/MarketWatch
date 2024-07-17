const Admin = require("../../model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminlogin = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.json({
        status: "failed",
        msg: "user not find",
      });
    }
    let ispassmatched = await bcrypt.compare(password, user.password);
    if (ispassmatched) {
      const jwttoken = jwt.sign(
        { user: user.toJSON(), role: user.role },
        process.env.JWTSECRETKEY
        // {
        //   expiresIn: "100m",
        // }
      );
      res.json({
        Status: "success",
        msg: "successfuly loggedIN",
        jwttoken,
        data: user,
      });
    } else {
      res.json({
        Status: "Incorrect Password",
        status: "failed",
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
