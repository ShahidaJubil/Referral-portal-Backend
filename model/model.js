const mongoose = require("mongoose");

const apiModel = new mongoose.Schema({
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
  role: {
    type: String,
    required: false,
    enum: ["mentor", "student", "guest"],
  },
  specialization: {
    type: String,
  },

    title: {
      type: String,
      required: false,
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
    earnedPoints: Number,
});

module.exports = mongoose.model("users", apiModel);
