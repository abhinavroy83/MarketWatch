const Business = require("../../../model/bussiness");

const deletebusiness = async (req, res) => {
  try {
    const { _id } = req.params;
    await Business.findByIdAndDelete(_id);
    res.json({
      status: true,
      msg: "successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

module.exports = deletebusiness;
