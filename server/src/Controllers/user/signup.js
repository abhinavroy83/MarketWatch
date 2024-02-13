const User = require("../../model/user");
const bcrypt = require("bcrypt"); 

const singup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const encrytpass = await bcrypt.hash(password, 10);
    const newUser = new User({ email, name, password: encrytpass });
    await newUser.save();
    res.json({
      status: "Success",
      msg: "Successfully signup",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
    });
  }
};

module.exports = singup;
