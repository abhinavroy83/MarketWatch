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

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let encrytpass;
    
    if (password) {
      encrytpass = await bcrypt.hash(password, 10);
    }

    user.belongcity = belongcity !== undefined ? belongcity : user.belongcity;
    user.isVerified = isVerified !== undefined ? isVerified : user.isVerified;
    user.lastName = lastName !== undefined ? lastName : user.lastName;
    user.firstName = firstName !== undefined ? firstName : user.firstName;
    user.password = encrytpass !== undefined ? encrytpass : user.password;
    user.userimg = userimg !== undefined ? userimg : user.userimg;
    user.dob = dob !== undefined ? dob : user.dob;
    user.gender = gender !== undefined ? gender : user.gender;
    user.country = country !== undefined ? country : user.country;
    user.state = state !== undefined ? state : user.state;
    user.city = city !== undefined ? city : user.city;
    user.address = address !== undefined ? address : user.address;
    user.pin = pin !== undefined ? pin : user.pin;
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
