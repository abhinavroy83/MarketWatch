const Job = require("../../model/job");

const getjobforuser = async (req, res) => {
  try {
    const { userID } = req.params;
    const jobs = await Job.find({ UserId: userID });
    if (jobs.length === 0) {
      return res.status(404).json({
        msg: "job not found for the user",
      });
    }
    res.json({
      msg: "success",
      job: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "internal server issue",
    });
  }
};

module.exports = getjobforuser;
