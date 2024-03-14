const Event = require("../../model/Events");

const getspecificevent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const events = await Event.findById({ _id: eventId });
    if (events.length === 0) {
      return res.status(404).json({
        msg: "Events are not avaible", 
      });
    }
    res.json({
      msg: "success",
      events: events,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = getspecificevent;
