const { boolean } = require("joi");
const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema

const postRequirement = new mongoose.Schema({
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
  image: {
    type: String,
    get: (image) => `http://localhost:5000/${image}`,
  },
  filename:{
    type:String
  },
  hospitalname:{
    type:String
  },
  about:{
    type:String
  },
  facilities:{
    type:String
  },
  available:{
    type:Boolean,
    default:true
  },
  user:{
    type:ObjectId,
    ref:"JWT"
  }
},{
  toJSON: { getters: true },
},{timestamps:true});

module.exports = mongoose.model("postRequirement", postRequirement);
