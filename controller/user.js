const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/model");
const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
// const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const JWT = require("./jwt");

// var MongoDBStore = require("connect-mongodb-session")(session);

// Use express-session middleware to manage sessions
// const store = new MongoDBStore({
//   uri: process.env.DB,
//   collection: "mySessions",
// });

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

// -------------------------------SIGNUP----------------------------------

const RegisterUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
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
  const user = new User({
    email,
    password: hashedPassword,
    name,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json({
      savedUser,
    });
  } catch (error) {
    console.error(error); // log the error for debugging
    res.status(500).send("Internal Server Error",+error);
  }
});

// ---------------------------------LOGIN------------------------------------------------

// const LoginUser = asyncHandler(async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email and password" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       // res.send("403");
//       return res
//         .status(401)
//         .json({ success: false, message: "Email doesn't exists!" });
//     }
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.send("Login successful");
//       res.json(req.session.data);
//       const token = JWT.generateToken(user);
//       const username = user.name;
//       req.session.user = user;
//       res.json({ success: true });
//       res.json(token);
//       res.json(username);

//       res.redirect("/");
//     } else {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (err) {
//     return next(createError(500, err.message));
//   }
// });

const LoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = JWT.generateToken(user);
      const username = user.name;
      
      if (req.session) {
        req.session.user = user;
      }
      
      return res.status(200).json({ success: true, token, username });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    return next(createError(500, err.message));
  }
});

module.exports = { RegisterUser, LoginUser };
