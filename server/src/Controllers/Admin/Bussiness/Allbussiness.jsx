const Business = require("../../../model/bussiness");

const getallBusiness = async (req, res) => {
  try {
    const Allbussiness = await Business.find({});
    res.json({
      status: true,
      Allbussiness,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
};
