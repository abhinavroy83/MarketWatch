const User = require("../../model/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const updateuser = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      lastName,
      firstName,
      dob,
      gender,
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

    if (req.file) {
      user.userimg = req.file.path;
    }
    console.log(req.file);
    user.lastName = lastName || user.lastName;
    user.firstName = firstName || user.firstName;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;
    user.country = country || user.country;
    user.state = state || user.state;
    user.city = city || user.city;
    user.address = address || user.address;
    user.pin = pin || user.pin;
    console.log(req.body);
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

(module.exports = upload.single("userimg")), updateuser;
