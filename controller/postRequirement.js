const postRequirement = require("../model/postRequirement");
const User = require("../model/jobApplication");
const express = require("express");
const multer = require("multer");
const app = express();
app.use("/uploads", express.static("uploads"));

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("image");

const postJob = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const job = new postRequirement({
        job: req.body.job,
        specialization: req.body.specialization,
        experience: req.body.experience,
        details: req.body.details,
        location: req.body.location,
        about: req.body.about,
        hospitalname: req.body.hospitalname,
        //image: req.file.path,
        // filename: req.file.filename,
      });

      const jobDetails = job.save();
      res.json(job);
    }
  });
};

const searchJobs = async (req, res) => {
  const { hospitalname, location, specialization } = req.query;

  try {
    const results = await postRequirement.find({
      ...(hospitalname && {
        hospitalname: { $regex: new RegExp(hospitalname, "i") },
      }),
      ...(location && { location: { $regex: new RegExp(location, "i") } }),
      ...(specialization && {
        specialization: { $regex: new RegExp(specialization, "i") },
      }),
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putDetails = async (req, res) => {
  try {
    const check = await postRequirement.findByIdAndUpdate(req.params.id);
    check.name = req.body.name;
    check.email = req.body.email;
    check.job = req.body.job;

    check.specialization = req.body.specialization;
    check.experience = req.body.experience;
    check.details = req.body.details;
    check.location = req.body.location;

    const a3 = await check.save();
    res.json(a3);
  } catch (error) {
    res.send(error);
  }
};

const deletedetails = async (req, res) => {
  try {
    const details = await postRequirement.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getdetails = async (req, res) => {
  try {
    const details = await postRequirement.find();
    // await details.populate(details, { path: 'user', model: 'User' });

    res.json(details);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// const getdetails = async (req, res) => {
//   try {
//     const details = await postRequirement.find();
//     const populatedDetails = await postRequirement.populate(details, { path: 'user', model: 'User' });

//     const jobIds = populatedDetails.map((job) => job.id);
//     const jobApps = await User.find({ jobId: { $in: jobIds } }).populate('userId');

//     const jobsWithUsers = populatedDetails.map((job) => {
//       const matchingJobApp = jobApps.find((app) => app.jobId === job.id);
//       if (matchingJobApp) {
//         return { ...job.toObject(), user: matchingJobApp.userId };
//       } else {
//         return job;
//       }
//     });

//     res.json(jobsWithUsers);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };
const geteachdetails = async (req, res) => {
  try {
    const details = await postRequirement.findById(req.params.id);
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  postJob,
  deletedetails,
  getdetails,
  geteachdetails,
  putDetails,
  searchJobs,
};
