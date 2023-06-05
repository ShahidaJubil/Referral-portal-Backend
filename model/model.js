const mongoose = require("mongoose");

const apiModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
    required: false,
    enum: ["user", "admin", "guest"],
  },
  profile: {
    title: {
      type: String,
      required: false,
    },
    specialization: {
      type: String,
    },
    experience: {
      type: String,
      required: false,
    },
    contact: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      get: (image) => `http://localhost:5000/${image}`,
    },
    location: {
      type: String,
    },
  },
  jobsApplied: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobsModel",
      },
      status: {
        type: String,
        enum: ["Apply", "Applied", "Pending", "Scheduled", "Rejected"],
        default: "Apply Now",
      },
    },
  ],
});

module.exports = mongoose.model("users", apiModel);
