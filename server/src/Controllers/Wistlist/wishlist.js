const Wishlistmodal = require("../../model/Wishlist");

const postwistlist = async (req, res) => {
  try {
    const { roomId, status } = req.body;
    const UserId = req.user.user._id;
    const wish = new Wishlistmodal({
      roomId,
      status,
      UserId,
    });

    await wish.save();
    res.json({
      msg: "succesfully added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findwishlist = async (req, res) => {
  try {
    const { UserId } = req.params;
    const list = await Wishlistmodal.find({ UserId });
    if (list.length === 0) {
      return res.status(404).json({
        msg: "Rooms not found for the user",
      });
    }
    res.json({
      msg: "success",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};
const findwishlistwithroomid = async (req, res) => {
  try {
    const { roomId } = req.params;
    const list = await Wishlistmodal.find({ roomId });
    if (list.length === 0) {
      return res.json({
        status: "not",
        msg: "Rooms not found for the user",
      });
    }
    res.json({
      msg: "success",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

const deletelist = async (req, res) => {
  try {
    const { userid } = req.params;
    const dellist = await Wishlistmodal.findOneAndDelete({ roomId: userid });
    if (dellist.deletedCount === 0) {
      return res.status(404).json({
        msg: "wishlist not found",
      });
    }
    res.json({
      msg: "Deleted the successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = {
  postwistlist,
  findwishlistwithroomid,
  findwishlist,
  deletelist,
};
