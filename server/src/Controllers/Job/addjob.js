const Job = require("../../model/job");

const addjob = async (req, res) => {
  try {
    const { company_name, postion, jobtype, salary, job_location, location } =
      req.body;
    const UserId = req.user.user._id;
    const newjob = new Job({
      UserId,
      company_name,
      postion,
      jobtype,
      salary,
      job_location,
      location,
    });
    await newjob.save();
    res.json(newjob);
  } catch (error) {
    console.error("Error adding job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addjob;
