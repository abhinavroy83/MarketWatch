const Room = require("../../model/room");

const deleterooms = async (req, res) => {
  try {
    const { roomsID } = req.params;
    const delroom = await Room.findByIdAndDelete({ _id: roomsID });
    if (delroom.deletedCount === 0) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }
    res.json({
      msg: "Deleted the room successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = deleterooms;
