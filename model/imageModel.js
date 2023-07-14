const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    enum: ["mentor", "student", "guest"],
  },
  fname: {
    type: String,
    default: "First Name",
  },
  lname: {
    type: String,
    default: "Last Name",
  },
  location: {
    type: String,
    default: "Location",
  },
  phone: {
    type: String,
    default: "Contact",
  },
  imageData: {
    type: String,
  },
  refers: [
    {
      remail: {
        type: String,
        required: false,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      },
      rlname: {
        type: String,
        required: false,
      },
      rfname: {
        type: String,
      },
      rcontact: {
        type: Number,
        required: false,
      },
      rlocation: {
        type: String,
      },
      rcourse: {
        type: String,
      },
      rduration: {
        type: String,
      }
    }
  ],
  successReferrals:[
    {
      sfname:{
        type:String
      },
      slname:{
        type:String
      },
      scourse:{
        type:String
      },
      sduration:{
        type:String
      },
      points:{
        type:Number
      },
      total:{
        type:String
      }
    }
  ],
  referralLink: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model("Profile", ImageSchema);
