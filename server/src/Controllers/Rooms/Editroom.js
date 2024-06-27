const Room = require("../../model/room");

const updateroom = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateFields = req.body;

    // Retrieve the existing room document
    const existingRoom = await Room.findById(_id);
    if (!existingRoom) {
      return res.status(404).json({
        status: "failed",
        msg: "Room not found",
      });
    }

    // Preserve UserId and postedon if not provided in the update
    if (!updateFields.UserId) {
      updateFields.UserId = existingRoom.UserId;
    }
    if (!updateFields.postedon) {
      updateFields.postedon = existingRoom.postedon;
    }
    if (updateFields.location) {
      updateFields.location = existingRoom.location;
    }

    // Update the room document
    const result = await Room.findByIdAndUpdate(
      _id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (result) {
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "failed",
        msg: "Room update failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "failed",
      error: error.message,
    });
  }
};

module.exports = updateroom;
