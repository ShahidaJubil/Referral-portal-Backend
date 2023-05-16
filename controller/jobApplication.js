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

    return res.status(201).json({ message: "Job application created successfully" });
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

module.exports = { applyJob, getApplications, checkApplications };
