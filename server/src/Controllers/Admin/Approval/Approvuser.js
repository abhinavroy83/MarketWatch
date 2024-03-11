const Approvalrequest = require("../../../model/Approvalrequest");

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
    const pendignrequest = await Approvalrequest.find({
      status: "pending",
    });
    res.json({
      pendignrequest,
    });
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

module.exports = { createapproval, getapprovalrequest, approvaluser };
