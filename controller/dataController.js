/// This controller is used for various tasks dealing with formatting the database as it lacks consistency in some collections.
// The apis defined here probably has only single use.
// Not to be used by the frontend.

const postRequirement = require("../model/postRequirement");
const Hospital = require("../model/hospitalModel");
const User = require("../model/model");
const JobApp = require("../model/jobApplication");
const express = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));

const formatJobApp = async (req, res) => {
  try {
    // Get all job applications from the jobApplications collection
    const jobApplications = await JobApp.find();
    // console.log("firssst",jobApplications);
    // Loop through each job application
    for (const jobApplication of jobApplications) {
      // Find the user in the userapi collection by userId
      const user = await User.findOne({ _id: jobApplication.userId });

      // If the user exists, update the jobsApplied field with the jobId
      if (user) {
        // console.log("first");
        user.jobsApplied.push(jobApplication.jobId);
        await user.save();
      }
    }

    res.status(200).json({ message: "jobsApplied field updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Route to remove redundant entries
const removeDuplicates = async (req, res) => {
  try {
    // Find duplicate entries based on jobId and userId
    const duplicateEntries = await JobApp.aggregate([
      {
        $group: {
          _id: { jobId: "$jobId", userId: "$userId" },
          count: { $sum: 1 },
          ids: { $push: "$_id" },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    // Remove redundant entries
    const removedEntries = await JobApp.deleteMany({
      _id: { $in: duplicateEntries.flatMap((entry) => entry.ids.slice(1)) },
    });

    res.json({
      message: "Redundant entries removed",
      removedCount: removedEntries.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { formatJobApp , removeDuplicates };
