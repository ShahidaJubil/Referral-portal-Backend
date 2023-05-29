const uploadProfile = require("../model/model");
const multer = require("multer");
const express = require("express");
const app = express();
app.use("/uploads", express.static("uploads"));

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("image");

const postProfile = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const profile = new uploadProfile({
        name: req.body.name,  
        // email: req.body.email,
        specialization: req.body.specialization,
        experience: req.body.experience,
        address: req.body.address,
        title: req.body.title,
        contact: req.body.contact,
        // image: req.file.path,
        // cv: {
        //   data: req.file.filename,
        //   contentType: "pdf/doc",
        // },
        location: req.body.location,
      });

      profile.save();
      res.json(profile);
    }
  });
};

const putProfile = async (req, res) => {
  try {
    const check = await uploadProfile.findByIdAndUpdate(req.params.id);
    check.name = req.body.name;
    check.title = req.body.title;
    check.contact = req.body.contact;
    (check.location = req.body.location),
      (check.specialization = req.body.specialization);
    check.experience = req.body.experience;
    check.details = req.body.details;
    const a3 = await check.save();
    res.json(a3);
  } catch (error) {
    res.send(error);
  }
};


const getProfile = async (req, res) => {
  try {
    const details = await uploadProfile.find();
    res.json(details);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const geteachProfile = async (req, res) => {
  try {
    const details = await uploadProfile.findById(req.params.id);
    // console.log("idp", req.params.id);
    // console.log("details", details);
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { proId } = req.body;
    const userProfile = await uploadProfile.findById(proId);
    console.log("idp", proId);
    console.log("userP",userProfile);
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  postProfile,
  putProfile,
  geteachProfile,
  getProfile,
  getUserProfile,
};
