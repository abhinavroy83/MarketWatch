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

module.exports = { posthelpmsg, gethelpmsg };
