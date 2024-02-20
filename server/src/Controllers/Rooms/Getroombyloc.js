const Room = require("../../model/room");

const getroombycurrentlocation = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const allroom = await Room.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lat), parseFloat(lng)],
          },
          $maxDistance: 500000, 
        },
      },
    });
    res.json({
      msg: "success",
      Allrooms: allroom,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getroombycurrentlocation;
