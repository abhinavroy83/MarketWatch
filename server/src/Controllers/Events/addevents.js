const Event = require("../../model/Events");

const addevent = async (req, res) => {
  try {
    const { img, city, location } = req.body;
    const UserId = req.user.user._id;
    const newevent = new Event({
      UserId,
      img,
      city,
      location,
    });
    await newevent.save();
    res.json(newevent);
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addevent;
