const User = require("../../model/user");

const findspecifcuser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (user) {
      res.json({
        msg: "sucess",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "failed",
    });
  }
};

module.exports = findspecifcuser;
