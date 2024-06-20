const City = require("../../model/City");

const postcity = async (req, res) => {
  try {
    const { country, state, city, subarea, zipcode, area } = req.body;
    const AdminID = req.user.user._id;
    const newcity = await City.create({
      AdminID,
      country,
      state,
      city,
      subarea,
      zipcode,
      area,
    });
    res.json({
      city: newcity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getcity = async (req, res) => {
  try {
    const city = await City.find({});
    if (!city) {
      res.json({
        msg: "city are not avaible",
      });
    }
    res.json({
      city,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findsuburbs = async (req, res) => {
  try {
    const { area_name } = req.params;

    const suburbs = await City.find({ city: area_name });
    if (suburbs) {
      res.json({
        suburbs,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletesub = async (req, res) => {
  try {
    const { id } = req.params;
    await City.findByIdAndDelete(id);
    res.json({
      msg: "delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { postcity, getcity, deletesub, findsuburbs };
