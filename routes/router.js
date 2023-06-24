const express = require("express");
const router = express.Router();


const { RegisterUser, LoginUser, DeleteUser } = require("../controller/user");

const {
  postProfile,
  putProfile,
  geteachProfile,
  getProfile,
  getUserProfile,
} = require("../controller/profileController");


router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.delete("/user/delete/:id",DeleteUser);


//changed model from model/jwt.js to model/model.js,added require and route
router.post("/profile/add", postProfile);
router.post("/profile", getUserProfile);
router.get("/profile/get", getProfile);
router.put("/profile/update/:id", putProfile);
router.get("/profile/:id", geteachProfile);


module.exports = router;
