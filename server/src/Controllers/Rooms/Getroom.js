const Room = require("../../model/room");

const getroomforspeficuser = async (req, res) => {
  try {
    const { userID } = req.params;
    const rooms = await Room.find({ UserId: userID });
    if (rooms.length === 0) {
      return res.status(404).json({
        msg: "Rooms not found for the user",
      });
    }
    res.json({
      msg: "success",
      rooms: rooms,
    });
  } catch (error) { 
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  } 
};

module.exports = getroomforspeficuser;
