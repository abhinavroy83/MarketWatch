const Room = require("../../model/room");

const nextroom = async (req, res) => {
  try {
    const currentRoom = await Room.findById(req.params.roomId);
    if (!currentRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    const nextRoom = await Room.findOne({ _id: { $gt: currentRoom._id } }).sort(
      { _id: 1 }
    );
    if (!nextRoom) {
      return res.json({ nextRoom: null });
    }

    res.json({ nextRoom });
  } catch (error) {
    console.error("Error fetching next room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const prvsroom = async (req, res) => {
  try {
    const currentRoom = await Room.findById(req.params.roomId);
    if (!currentRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    const previousRoom = await Room.findOne({
      _id: { $lt: currentRoom._id },
    }).sort({ _id: -1 });
    if (!previousRoom) {
      return res.json({ previousRoom: null });
    }

    res.json({ previousRoom });
  } catch (error) {
    console.error("Error fetching previous room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { prvsroom, nextroom };
