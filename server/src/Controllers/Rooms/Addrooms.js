const Room = require("../../model/room");

const addroom = async (req, res) => {
  try {
    const { city, Hotelname, PrdImage, rent, address, location } = req.body;
    const UserId = req.user.user._id;
    const rooms = new Room({
      UserId,
      Hotelname,
      city,
      PrdImage,
      rent,
      address,
      location,
    });
    await rooms.save();
    res.json({
      rooms,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addroom;
