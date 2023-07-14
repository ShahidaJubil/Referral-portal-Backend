const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/ImageModel");
const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const JWT = require("./jwt");
const { generateUniqueId } = require("../utils"); // Replace './utils' with the actual path to your utility file
const mongoose=require('mongoose')

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
  const {
    email,
    password,
    fname,
    lname,
    specialization,
    experience,
    phone,
    location,
  } = req.body;

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
    const user = new User({
      email,
      password: hashedPassword,
      fname,
      lname,
      location,
      specialization,
      experience,
      phone,
      role: "mentor", // Assigning the role
    });

    const savedUser = await user.save();

    const referralLink = generateReferralLink(savedUser._id);

    // Save the referral link in the user's account details in the database
    savedUser.referralLink = referralLink;
    await savedUser.save();

    res.status(200).json({ savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      const fname = user.fname;
      const lname = user.lname;
      const user_id = user._id;
      const prof_id = user.profileId;
      const role = user.role;
      res.json({ success: true, token, fname, prof_id, role, user_id, lname });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return next(createError(500, err.message));
  }
});
// Generating a referral link
function generateReferralLink(userId) {
  const uniqueId = generateUniqueId(); // Implement this function to generate a unique identifier
  return `http://localhost:3000/refer/${userId}/${uniqueId}`;
}

const DeleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user by their ID
    await User.findByIdAndRemove(userId);
    console.log("Deleted User.");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
// Get user details
const GetUser = async (req, res) => {
  const userId = req.params.id;

  // Validate userId
  if (!userId || !mongoose.isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }


  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user details
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const PutUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user details
    user.email = updatedData.email || user.email;
    user.fname = updatedData.fname || user.fname;
    user.lname = updatedData.lname || user.lname;
    user.specialization = updatedData.specialization || user.specialization;
    user.experience = updatedData.experience || user.experience;
    user.phone = updatedData.phone || user.phone;

    // Save the updated user
    const updatedUser = await user.save();

    // Return the updated user details
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};


const postReferral= async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user profile by user ID
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Create a new referral object from the request body
    const newReferral = {
      remail: req.body.remail,
      rlname: req.body.rlname,
      rfname: req.body.rfname,
      rcontact: req.body.rcontact,
      rlocation: req.body.rlocation,
      rcourse: req.body.rcourse,
      rduration: req.body.rduration,
    };

    // Add the new referral to the user's refers array
    userProfile.refers.push(newReferral);

    // Save the updated user profile
    const updatedProfile = await userProfile.save();

    res.status(201).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { RegisterUser, LoginUser, DeleteUser, GetUser, PutUser,postReferral};
