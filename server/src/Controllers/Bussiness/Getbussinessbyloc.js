const Business = require("../../model/bussiness");

const Getbussinessbyloc = async (req, res) => {
  try {
    const { lat, lng, city } = req.query;

    if (city) {
      const allbusi = await Business.find({ city });
      res.json({
        msg: "success",
        AllBusiness: allbusi,
      });
    } else {
      const allbusi = await Business.find({
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
        Allbusiness: allbusi,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = Getbussinessbyloc;
