const Approvalrequest = require("../../../model/Approvalrequest");
const User = require("../../../model/user");

const createapproval = async (req, res) => {
  try {
    const { userId, reason } = req.body;
    const requestedID = req.user.user._id;
    const newApproval = await Approvalrequest.create({
      userId,
      reason,
      requestedID,
    });

    res.json({
      newApproval,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getapprovalrequest = async (req, res) => {
  try {
    const pendingrequest = await Approvalrequest.find({
      status: "pending",
    });
    if (!pendingrequest || pendingrequest.length === 0) {
      res.json({
        msg: "Requests are not available",
      });
    } else {
      res.json({
        pendingrequest,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approvaluser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status } = req.body;
    const approvalRequest = await Approvalrequest.findById(_id);
    if (!approvalRequest) {
      return res.status(404).json({ message: "Approval request not found" });
    }

    if (approvalRequest.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Approval request has already been processed" });
    }

    approvalRequest.status = status;
    await approvalRequest.save();

    res.json(approvalRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteuser = async (req, res) => {
  try {
    const { _id } = req.params;
    const finduser = await Approvalrequest.find({ _id, status: "approved" });
    if (finduser && finduser.length > 0) {
      const userId = finduser[0].userId;
      const finddeletinuser = await User.findByIdAndDelete({ _id: userId });

      if (finddeletinuser) {
        res.json({
          msg: "succesfully deleted",
        });
      }
    }
  } catch (error) {
    console.log("something wrong", error);
    res.json({
      msg: "error in deleting",
      status: "failed",
    });
  }
};

module.exports = {
  createapproval,
  deleteuser,
  getapprovalrequest,
  approvaluser,
};
