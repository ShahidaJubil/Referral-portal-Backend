const mongoose = require("mongoose");

const PremiumUsers= mongoose.Schema({
  name:{
    type:String
  },
  specialization:{
    type:String
  },
  location:{
    type:String
  },
  experience:{
    type:String
  },
  image: {
    type: String,
    get: (image) => `http://localhost:5000/${image}`,
  },

},{
  toJSON: { getters: true },
});

module.exports=mongoose.model("Premium User",PremiumUsers)
