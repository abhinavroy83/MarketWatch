const User = require("../../model/user");
const bcrypt = require("bcrypt");

const verifypassword = async (req, res) => {
const verifypassword = async (req, res) => {
  const { userID, password } = req.body;
  // console.log(req.body);

  try {
    const user = await User.findById({ _id: userID });
  
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = verifypassword;
