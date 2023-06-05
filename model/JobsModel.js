const { boolean } = require("joi");
const mongoose = require("mongoose");

const JobsModel = new mongoose.Schema(
  {
    job: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
    },
    // image: {
    //   type: String,
    //   get: (image) => `http://localhost:5000/${image}`,
    // },
    filename: {
      type: String,
    },
    hospitalname: {
      type: String,
    },
    hospitalId : {
      type : mongoose.Schema.Types.ObjectId,
      required : false , // Must be set to true after flushing the DB. Do so now may cause bugs.
      ref : "hospitals",
    },
    about: {
      type: String,
    },
    facilities: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    // user: [{ type: mongoose.Schema.Types.ObjectId }],
    // // ref: "user",
    user : {
      type : [mongoose.Schema.Types.ObjectId],
      default:[]
    }
  },
  {
    toJSON: { getters: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobsModel", JobsModel);
