const postRequirement = require("../model/postRequirement");
const express = require("express");
const multer = require("multer");
const User = require("../model/model");
const JobList = require("../model/postRequirement");
const UserJob = require("../model/jobApplication");

const app = express();
app.use("/uploads", express.static("uploads"));

const applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const usr = await User.findById(userId);
    const job = await JobList.findById(jobId);
    if (!usr || !job) {
      return res.status(404).json({ message: "User or job not found" });
    }

    const userJob = new UserJob({ userId, jobId, status: "Applied" });
    await userJob.save();

    // Update the user field of the JobList schema
    await JobList.updateOne({ _id: jobId }, { $addToSet: { user: userId } });

    return res
      .status(201)
      .json({ message: "Job application created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getApplications = async (req, res) => {
  try {
    const details = await UserJob.find();
    res.json(details);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const checkApplications = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    const application = await UserJob.findOne({ userId, jobId });
    if (application) {
      return res.json({ success: "true" });
    }
    return res.json({ success: "false" });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Check Application :Server Error", err });
  }
};

const userApplication = async (req, res) => {
  try {
    // const { userId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No such user found." });
    }
    console.log("Found User!!");
    if (user.jobsApplied.length === 0) {
      return res
        .status(200)
        .json({ message: "No applications submitted yet." });
    }
    console.log("Found Applications!!", user.jobsApplied);
    const applications = user.jobsApplied;
    return res.status(200).json({ applications });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const userRemoveApplication = async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobId = req.params.jobId;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const job = await JobList.findById(jobId);
    if(!job){
      return res.status(404).json({error : "Unable to find the Job."});
    }

    // Remove the applicationId from the jobsApplied field
    const index = user.jobsApplied.indexOf(jobId);
    if (index !== -1) {
      user.jobsApplied.splice(index, 1);
      await user.save();
    }

    const userIndex = job.user.indexOf(userId);
    if(index !== -1) {
      job.user.splice(userIndex,1);
      await job.save();
    } 

    res.json({ message: "Application removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  applyJob,
  getApplications,
  checkApplications,
  userApplication,
  userRemoveApplication
};
