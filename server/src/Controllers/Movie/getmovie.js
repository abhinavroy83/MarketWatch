const Movie = require("../../model/Movie");

const getmovie = async (req, res) => {
  try {
    const { lat, lng, city } = req.query;
    let allmovie;
    if (city) {
      allmovie = await Movie.find({ city });
    } else {
      allmovie = await Movie.find({
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
      allmovie,
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getmovie;
