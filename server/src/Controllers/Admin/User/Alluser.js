const User = require("../../../model/user");

const findalluser = async (req, res) => {
  try {
    const Alluser = await User.find({});
    res.json({
      status: true,
      user: Alluser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

module.exports = findalluser;
