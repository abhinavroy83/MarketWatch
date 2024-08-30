const Help = require("../../model/Help");

const posthelpmsg = async (req, res) => {
  try {
    const data = req.body;
    const saveddata = await Help.create(data);
    return res.status(201).json({
      success: true,
      message: "Help message posted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while posting the help message",
    });
  }
};

const gethelpmsg = async (req, res) => {
  try {
    const data = await Help.find({});
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while posting the help message",
    });
  }
};

const deletemsg = async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Help.findByIdAndDelete(_id);
    if (result) {
      return res.json({
        success: true,
        message: "Message deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while delete the help message",
    });
  }
};

module.exports = { posthelpmsg, gethelpmsg, deletemsg };
