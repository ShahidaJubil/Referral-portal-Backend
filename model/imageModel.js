const mongoose = require("mongoose");

const imgModel = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
  },
  password:{
    type:String,
    required: true,
  },
  cpassword:{
    type:String,
    // required: true,
  }
});

module.exports=mongoose.model("image",imgModel)
