const Event = require("../../model/Events");

const getevent = async (req, res) => {
  try {
    const { lat, lng, city } = req.query;
    let allevent;
    if (city) {
      allevent = await Event.find({ city });
    } else {
      allevent = await Event.find({
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
    }
    res.json({
      msg: "success",
      allevent,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getevent;