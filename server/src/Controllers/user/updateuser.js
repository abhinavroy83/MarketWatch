const User = require("../../model/user");
const bcrypt = require("bcrypt");

const updateuser = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      isVerified,
      belongcity,
      lastName,
      firstName,
      dob,
      password,
      gender,
      userimg,
      country,
      state,
      city,
      address,
      pin,
    } = req.body;
    const user = await User.findById(_id);
    const encrytpass = await bcrypt.hash(password, 10);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.belongcity = belongcity || user.belongcity;
    user.isVerified = isVerified || user.isVerified;
    user.lastName = lastName || user.lastName;
    user.firstName = firstName || user.firstName;
    user.password = encrytpass || user.password;
    user.userimg = userimg || user.userimg;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;
    user.country = country || user.country;
    user.state = state || user.state;
    user.city = city || user.city;
    user.address = address || user.address;
    user.pin = pin || user.pin;
    await user.save();
    res.json({
      msg: "user updated successfuly",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", error });
  }
};

module.exports = updateuser;
