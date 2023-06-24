
const asyncHandler = require("express-async-handler");
const User = require("../model/model");
const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const JWT = require("./jwt");



app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

const RegisterUser = asyncHandler(async (req, res) => {
  const { email, password, name,specialization,experience,contact } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ message: "Please add all fields" });
    return;
  }
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    res.status(409).json({ message: "This email is already registered" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // const savedProfile = await profile.save();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      specialization,experience,contact,
      role: "mentor" // Assigning the role field
      // profileId: savedProfile._id, // set the profile reference in the user model
    });
    try {
      const savedUser = await user.save();
      res.status(200).json({
        savedUser,
      });
    } catch (error) {
      console.error(error); // log the error for debugging
      res.status(500).send("Internal Server Error", +error);
    }
  } catch (error) {
    console.error("profError : ", error);
    res.status(500).send("Cannot create profile", +error);
  }
});

const LoginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email doesn't exists!" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = JWT.generateToken(user);
      const username = user.name;
      const user_id = user._id;
      const prof_id = user.profileId;
      const role = user.role;
      res.json({ success: true, token, username, prof_id ,role , user_id});
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return next(createError(500, err.message));
  }
});

const DeleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user by their ID
    await User.findByIdAndRemove(userId);
    console.log("Deleted User.")


    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { RegisterUser, LoginUser , DeleteUser };
