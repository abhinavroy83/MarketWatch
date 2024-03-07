const Movie = require("../../model/Movie");

const addmovie = async (req, res) => {
  try {
    const { img, city, location } = req.body;
    const UserId = req.user.user._id;
    const newmovie = new Movie({
      UserId,
      img,
      city,
      location,
    });
    await newmovie.save();
    res.json(newmovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addmovie;
