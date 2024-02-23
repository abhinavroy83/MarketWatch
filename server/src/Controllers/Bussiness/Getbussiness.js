const Business = require("../../model/bussiness");

const Getbusinessforspecficuser = async (req, res) => {
  try {
    const { userID } = req.params;
    const businesslist = await Business.find({ UserId: userID });
    if (businesslist.length === 0) {
      return res.status(404).json({
        msg: "Business List are not found",
      });
    }
    res.json({
      msg: "success",
      business: businesslist,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = Getbusinessforspecficuser;
