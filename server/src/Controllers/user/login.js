const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const login = async (req, res) => {
  console.log(req, res);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "failed",
        msg: "user not find",
      });
    }

    let ispassmatched = await bcrypt.compare(password, user.password);
    if (ispassmatched) {
      const jwttoken = jwt.sign(
        { user: user.toJSON() },
        process.env.JWTSECRETKEY,
        {
          expiresIn: "100m",
        }
      );
      console.log(user);
      res.json({
        status: "success",
        msg: "LoggedIN sucess",
        jwttoken,
        data: user,
      });
    }
    res.json({
      
    })
  } catch (error) {
    console.log("Error during login", error);
    res.json({
      status: "failed",
    });
  }
};

module.exports = login;
