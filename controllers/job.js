import Job from "../models/job.js";

const getAlljobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    res.status(200).json({ jobs, count: jobs.length });
  } catch (error) {
    console.error("Error in getAll job", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const getJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const job = await Job.findOne({
      _id: id,
      createdBy: userId,
    });

    if (!job) {
      return res.status(400).json({ msg: `no job with id ${id} ` });
    }
    res.status(200).json({ job });
  } catch (error) {
    console.error("Error in get job", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const createjob = async (req, res) => {
  try {
    // console.log(req.user)

    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    console.error("Error in create function", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const updatejob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id },
    } = req;

    if (company === "" || position === "") {
      return res
        .status(400)
        .json({ msg: "company or postion fields cannot to empty" });
    }
    const job = await Job.findByIdAndUpdate(
      { _id: id, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ job });
  } catch (error) {
    console.error("Error in update function", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const deletejob = async (req, res) => {
  try {
    const {id} = req.params
    const {userId}  = req.user

    const job = await Job.findByIdAndDelete({_id : id , createdBy : userId})
    
    if(!job){
      return  res.status(400).json({msg : `no task with id ${id}`})
    }
    res.status(200).json({msg : 'deleted successfully ' })
  } catch (error) {
    console.error("Error in delete function", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

export { getAlljobs, getJob, updatejob, deletejob, createjob };
