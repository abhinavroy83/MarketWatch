const Room = require("../../model/room");

const addroom = async (req, res) => {
  try {
    const {
      Adname,
      area,
      rent,
      utilities,
      bed,
      bath,
      laundary,
      gender,
      subarea,
      city,
      State,
      PrdImage,
      address,
      postedby,
      description,
      email,
      number,
      location,
    } = req.body;
    const UserId = req.user.user._id;
    const postedon = new Date().toISOString().split("T")[0];
    const rooms = new Room({
      UserId,
      Adname,
      area,
      rent,
      subarea,
      utilities,
      bed,
      bath,
      laundary,
      gender,
      city,
      State,
      PrdImage,
      address,
      postedby,
      postedon,
      description,
      email,
      number,
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
