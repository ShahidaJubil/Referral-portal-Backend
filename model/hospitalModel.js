const mongoose = require("mongoose");

const hospitalModel = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  location : {
    type : String,
    required : false,
  },
  image : {
    type : String,
    required : false,
  },
  postedJobs : {
    type : [mongoose.Schema.Types.ObjectId],
    default : [],
    ref : "JobsModel"
  },
  applications : {
    type : [mongoose.Schema.Types.ObjectId],
    default : [],
    ref : "JobApp"
  },
  about : {
    type : String,
    required : false,
  }
});


module.exports = mongoose.model("hospitals", hospitalModel);
