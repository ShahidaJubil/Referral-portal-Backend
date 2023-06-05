const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

const {
  addHospital,
  getAllHospital,
  getEachHospital,
  editHospital,
  deleteHospital,
  hospitalLogin,
  getPostedJobs,
} = require("../controller/hospitalController");

const {
  postJob,
  getdetails,
  putDetails,
  geteachdetails,
  deletedetails,
  searchJobs,
} = require("../controller/jobsController");
const { RegisterUser, LoginUser, DeleteUser } = require("../controller/user");
const { allUsers } = require("../controller/userController");
const {
  postProfile,
  putProfile,
  geteachProfile,
  getProfile,
  getUserProfile,
} = require("../controller/profileController");

const {
  applyJob,
  getApplications,
  checkApplications,
  userApplication,
  userRemoveApplication
} = require("../controller/jobApplication");

router.post("/signup", RegisterUser);
router.post("/login", LoginUser);
router.delete("/user/delete/:id",DeleteUser);

router.get("/getAllHosp", getAllHospital);
router.get("/getHosp/:id", getEachHospital);
router.post("/addHosp", upload.single("image"), addHospital);
router.put("/editHosp/:id", upload.single("image"), editHospital);
router.delete("/deleteHosp/:id", deleteHospital);
router.post("/hosp/login", hospitalLogin);
router.get("/hosp/:hospitalId/jobs", getPostedJobs);

router.get("/getAllusers", allUsers); //changed model from model/jwt.js to model/model.js,added require and route

router.post("/jobs/apply", applyJob);
router.get("/jobs/get", getApplications);
router.post("/jobs/check", checkApplications);
router.get("/user/jobs/:id",userApplication);
router.put("/remove/:userId/:jobId",userRemoveApplication);


router.post("/post/job", postJob);
router.get("/get/jobs", getdetails);
router.get("/searchJobs", searchJobs);
router.put("/update/job/:id", putDetails);
router.get("/geteach/job/:id", geteachdetails);
router.delete("/delete/job/:id", deletedetails);

router.post("/profile/add", postProfile);
router.post("/profile", getUserProfile);
router.get("/profile/get", getProfile);
router.put("/profile/update/:id", putProfile);
router.get("/profile/:id", geteachProfile);

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

// const { formatJobApp , removeDuplicates, fillFields } = require("../controller/dataController");

// router.post("/formatJobs",formatJobApp);
// router.delete("/removeDuplicates",removeDuplicates);
// router.get("/fill/fields",fillFields)


module.exports = router;
