const Room = require("../../model/room");

const addroom = async (req, res) => {
  try {
    const {
      city,
      State,
      postedby,
      Hotelname,
      PrdImage,
      rent,
      address,
      bed,
      bath,
      description,
      email,
      number,
      location,
    } = req.body;
    const UserId = req.user.user._id;
    const postedon = new Date().toISOString().split("T")[0];
    const rooms = new Room({
      UserId,
      postedon,
      Hotelname,
      postedby,
      email,
      number,
      bed,
      bath,
      State,
      city,
      PrdImage,
      description,
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
