const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { verifyJWT, createAndSendJWT } = require("../utils/jwt");
const crypto = require("crypto");

const signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  });

  if (!user) {
    return next(
      new AppError("Please enter all the necessary information.", 400)
    );
  }
  createAndSendJWT(user, res, 201);
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //Check for email and password
  if (!email || !password)
    return next(new AppError("Please enter both email and password", 400));

  //Find the email
  const user = await User.findOne({ email }).select(
    "-socialLinks -accountInfo -bio -blogs -role -__v"
  );

  //Verify password and email
  if (!user || !(await user.checkPassword(req.body.password, user.password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }
  createAndSendJWT(user, res, 200);
});

const googleAuth = catchAsync(async (req, res, next) => {
  const { email, name, profilePicture } = req.body;
  const user = await User.findOne({ email }).select(
    "-socialLinks -accountInfo -bio -blogs -role -__v"
  );
  if (user) {
    createAndSendJWT(user, res, 200);
  } else {
    const randomPassword = crypto.randomBytes(20).toString("hex");
    console.log(randomPassword);
    const username =
      name.split(" ")[0].toLowerCase() +
      Math.floor(Math.random() * (99999 - 10000 + 1));
    const newUser = await User.create({
      email,
      password: randomPassword,
      name,
      username,
      profilePicture,
    });
    createAndSendJWT(newUser, res, 200);
  }
});

module.exports = { signUp, logIn, googleAuth };
