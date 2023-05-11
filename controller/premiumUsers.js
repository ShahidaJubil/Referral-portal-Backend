const PremiumUsers=require ('../model/PremiumUsers')
const express = require("express");
const multer = require("multer");
const app = express();
app.use("/uploads" , express.static("uploads"))

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("image");

const postPremiumProfile = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const profile = new PremiumUsers({
        name:req.body.name,
        specialization: req.body.specialization,
        experience: req.body.experience,
        location: req.body.location,
        image: req.file.path,
        filename: req.file.filename,
      });

      profile.save();
      res.json(profile);
    }
  });
};


const putPremiumProfile = async (req, res) => {
  try {
    const check = await PremiumUsers.findByIdAndUpdate(req.params.id);
    check.name = req.body.name;
    check.specialization = req.body.specialization;
    check.experience = req.body.experience;
    check.location = req.body.location;

    const profile = await check.save();
    res.json(profile);
  } catch (error) {
    res.send(error);
  }
};

const deletePremiumProfile = async (req, res) => {
  try {
    const profile = await PremiumUsers.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


const getPremiumProfile = async (req, res) => {
  try {
    const profile = await PremiumUsers.find();
    res.json(profile);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
const getEachPremiumProfile = async (req, res) => {
  try {
    const profile = await PremiumUsers.findById(req.params.id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json(err.message);
  }
};


module.exports = {
  postPremiumProfile,
  deletePremiumProfile,
  getPremiumProfile,
  getEachPremiumProfile,
  putPremiumProfile,
};



