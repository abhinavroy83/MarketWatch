const Business = require("../../model/bussiness");

const getspecficbusiness = async (req, res) => {
  try {
    const { ID } = req.params;
    const getBusiness = await Business.findById({ _id: ID });
    if (getBusiness.length === 0) {
      return res.status(404).json({
        msg: "there is  not bussines for the user",
      });
    }

    res.json({
      msg: "sucess",
      Allbusineses: getBusiness,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = getspecficbusiness;
