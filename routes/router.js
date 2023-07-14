const express = require("express");
const router = express.Router();
const User = require("../model/ImageModel");

const {
  RegisterUser,
  LoginUser,
  DeleteUser,
  GetUser,
  PutUser,
  postReferDetails,
  getReferDetails,
  postReferral,
} = require("../controller/user");
const {
  postProfile,
  putProfile,
  geteachProfile,
  getProfile,
  getUserProfile,
  refer,
} = require("../controller/profileController");

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.delete("/user/delete/:id", DeleteUser);
router.get("/get/:id", GetUser);


router.post('/profiles/:userId/referrals', postReferral);



module.exports = router;
