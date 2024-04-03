const Room = require("../../model/room");

const getroombycurrentlocation = async (req, res) => {
  try {
    const { lat, lng, city } = req.query;
    let Allrooms;
    if (city) {
      Allrooms = await Room.find({ city });
    } else {
      Allrooms = await Room.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lat), parseFloat(lng)],
            },
            $maxDistance: 250000,   
          },
        },
      });
    }

    res.json({
      msg: "success",
      Allrooms,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getroombycurrentlocation;
