const User = require("../../../model/user");
const Room = require("../../../model/room");

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

const deleteuserbyalldata = async (req, res) => {
  try {
    const { _id } = req.params;
    const dltuser = await Room.deleteMany({ UserId: _id });
    
    if (dltuser) {
      await User.findByIdAndDelete(_id),
        res.json({
          msg: "deletesuccesfully",
        });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

module.exports = { deleteuser, deleteuserbyalldata };
