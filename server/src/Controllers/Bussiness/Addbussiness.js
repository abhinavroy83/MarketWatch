const Business = require("../../model/bussiness");

const addbusiness = async (req, res) => {
  try {
    const {
      Image,
      business_name,
      address1,
      city,
      state,
      country,
      zip,
      business_category,
      hours_open,
      email,
      number,
      description,
      location,
    } = req.body;
    const UserId = req.user.user._id;
    const { coordinates } = location;
    const date = new Date().toISOString().split("T")[0];
    const bussiness = new Business({
      Image,
      business_name,
      UserId,
      address1,
      date,
      city,
      state,
      country,
      zip,
      business_category,
      hours_open,
      email,
      number,
      description,
      location: {
        type: "Point",
        coordinates,
      },
    });
    await bussiness.save();
    res.json({
      bussiness,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addbusiness;
