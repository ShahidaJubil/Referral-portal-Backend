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
  // confirmpassword: {
  //   type: String,
  //   required: false,
  // },
  name: {
    type: String,
  },
  role: {
    type: String,
    required: false,
    enum: ["user", "admin", "guest"],
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
  jobsApplied : {
    type : [mongoose.Schema.Types.ObjectId],
    default : [],
    ref : "postRequirement",
  },
});


module.exports = mongoose.model("userapi", apiModel);
