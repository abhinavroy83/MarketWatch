const User = require("../../model/user");

const updateuser = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      lastName,
      firstName,
      country,
      city,
      displaybussinessname,
      legalbussinesname,
      address,
      website,
    } = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.lastName = lastName || user.lastName;
    user.firstName = firstName || user.firstName;
    user.country = country || user.country;
    user.city = city || user.city;
    user.displaybussinessname =
      displaybussinessname || user.displaybussinessname;
    user.legalbussinesname = legalbussinesname || user.legalbussinesname;
    user.address = address || user.address;
    user.website = website || user.website;

    await user.save();
    res.json({
      msg: "user updated successfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = updateuser;
