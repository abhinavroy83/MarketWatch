const User = require("../../../model/user");

const deleteuser = async (req, res) => {
  try {
    const { _id } = req.params;
    await User.findByIdAndDelete(_id);
    res.json({
      staus: true,
      msg: "succesfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

module.exports = deleteuser;
