const Job = require("../../model/job");

const getjobbycurrentloc = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const alljobs = await Job.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lat), parseFloat(lng)],
          },
          $maxDistance: 5000,
        },
      },
    });
    if (alljobs.length === 0) {
      return res.status(404).json({
        msg: "job not found for the user",
      });
    }
    res.json({
      msg: "sucess",
      Alljob: alljobs,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getjobbycurrentloc;
