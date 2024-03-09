const Room = require("../../../model/room");

const getadminallroom = async (req, res) => {
  try {
    const Allroom = await Room.find({});
    res.json({
      status: true,
      Allroom,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

const getadminallroombycity = async (req, res) => {
  try {
    const { city } = req.params;
    const Allroom = await Room.find({ city });
    res.json({
      status: true,
      Allroom,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

module.exports = { getadminallroom, getadminallroombycity };
