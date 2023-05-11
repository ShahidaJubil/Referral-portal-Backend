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
  confirmpassword:{
    type: String,
    required: false,
  },
  name:{
    type:String
  },

});

module.exports = mongoose.model("userapi", apiModel);
