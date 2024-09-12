const City = require("../../model/City");

const postcity = async (req, res) => {
  try {
    const { country, state, area, subarea, primaryState, zipcode } = req.body;
    const AdminID = req.user.user._id;
    const newcity = await City.create({
      AdminID,
      country,
      state,
      area,
      primaryState,
      subarea,
      zipcode,
    });
    res.json({
      city: newcity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatecity = async (req, res) => {
  try {
    const { _id } = req.params;
    const updateFields = req.body;

    const existingcity = await City.findById(_id);
    if (existingcity) {
      updateFields.AdminID = existingcity.AdminID;
      updateFields.area = updateFields.area || existingcity.area;
      updateFields.country = updateFields.country || existingcity.country;
      updateFields.state = updateFields.state || existingcity.state;
      updateFields.primaryState =
        updateFields.primaryState || existingcity.primaryState;
      updateFields.subarea = updateFields.subarea || existingcity.subarea;
      updateFields.zipcode = updateFields.zipcode || existingcity.zipcode;
    }

    const result = await City.findByIdAndUpdate(
      _id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (result) {
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "failed",
        msg: "area update failed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const findcitybyid = async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await City.findById(_id);
    if (result) {
      res.json({
        area: result,
      });
    }
  } catch (error) {
    console.log(error);
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

const findzipcode = async (req, res) => {
  const { zipcode } = req.query;
  try {
    const city = await City.findOne({ zipcode: zipcode });
    if (city) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking zipcode:", error);
    res.status(500).json({ exists: false, error: "Server error" });
  }
};

const findsuburbs = async (req, res) => {
  try {
    const { area_name } = req.params;

    const area = await City.find({ area: area_name });
    if (area) {
      res.json({
        area,
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
    await City.findByIdAndDelete({ _id: id });
    res.json({
      msg: "delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postcity,
  findcitybyid,
  getcity,
  deletesub,
  updatecity,
  findsuburbs,
  findzipcode,
};
