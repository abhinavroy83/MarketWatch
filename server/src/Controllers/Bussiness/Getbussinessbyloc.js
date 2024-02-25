const Business = require("../../model/bussiness");

const Getbussinessbyloc = async (req, res) => {
  try {
    const { lat, lng, city } = req.query;

    let allBusiness;
    if (city) {
      allBusiness = await Business.find({ city });
    } else {
      allBusiness = await Business.find({
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
      allBusiness,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = Getbussinessbyloc;
