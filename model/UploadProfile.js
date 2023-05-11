const mongoose = require("mongoose");

const uploadProfile = new mongoose.Schema({
 title:{
    type:String,
    required:true
 },
 name:{
  type:String
 },
  specialization: {
    type: String,
  },
  experience:{
    type:String,
    required: true,
  },
  contact:{
    type:Number,
    required: true,
  },
  address:{
    type:String,
    required: true,
  },
  image: {
    type: String,
    get: (image) => `http://localhost:5000/${image}`,
  },
  location:{
    type:String
  }
//   cv:{
//     type:File,
//     required:true
//   }
},{
  toJSON: { getters: true },
});

module.exports=mongoose.model("profile",uploadProfile)
