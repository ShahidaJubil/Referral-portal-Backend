const express = require("express");
const router = express.Router();
const {
  postJob,
  getdetails,
  putDetails,
  geteachdetails,
  deletedetails,
  searchJobs,
} = require("../controller/postRequirement");
const { RegisterUser, LoginUser } = require("../controller/user");
const { allUsers } = require("../controller/userController");
const {
  postProfile,
  putProfile,
  geteachProfile,
  getProfile,
  deleteProfile,

} = require("../controller/uploadProfile");

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);

router.get("/getAllusers", allUsers); //changed model from model/jwt.js to model/model.js,added require and route

router.post("/post/job", postJob);
router.get("/get/jobs", getdetails);
router.get("/searchJobs", searchJobs);
router.put("/update/job/:id", putDetails);
router.get("/geteach/job/:id", geteachdetails);
router.delete("/delete/job/:id", deletedetails);

router.post("/profile/add", postProfile);
router.get("/profile/get", getProfile);
router.put("/profile/update/:id", putProfile);
router.get("/profile/:id", geteachProfile);
router.delete("/profile/delete/:id", deleteProfile);

// router.post("/jwt/signup", jwtSignup);
// router.post("/jwt/signin", jwtSignin);
// router.get("/jwt/logout", logout);
// router.get("/jwt/me", isAuthenticated, userProfile);

// router.get("/allusers", isAuthenticated, allUsers);
// router.get("/singleuser/:id", isAuthenticated, isAdmin, singleUser);
// router.put("/edit/:id", isAuthenticated, editUser);
// router.delete("/deleteuser/:id", isAuthenticated, isAdmin, deleteUser);

// router.get("/type/jobs", allJobsType);
// router.post("/type/create", createJobType);

module.exports = router;
