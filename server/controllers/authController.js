const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { createAndSendJWT, verifyJWT } = require("../utils/jwt");
const crypto = require("crypto");

const signUp = catchAsync(async (req, res, next) => {
  const { email, username, name, password } = req.body;

  if (!email || !username || !name || !password) {
    return next(
      new AppError("Please enter all the necessary information.", 400)
    );
  }

  const user = await User.create({ email, username, name, password });

  createAndSendJWT(user, res, 201);
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter both email and password", 400));
  }

  const user = await User.findOne({ email }).select(
    "-role -__v -updatedAt -createdAt"
  );

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }

  createAndSendJWT(user, res, 200);
});

const googleAuth = catchAsync(async (req, res, next) => {
  const { email, name, profilePicture } = req.body;

  const user = await User.findOne({ email }).select("-role -__v");

  if (user) {
    return createAndSendJWT(user, res, 200);
  }

  const randomPassword = crypto.randomBytes(20).toString("hex");
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
});

const signout = (req, res, next) => {
  res
    .clearCookie("token", {
      path: "/",
      domain: "localhost",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    })
    .status(200)
    .json({ status: "success", message: "Successful signout" });
};

module.exports = { signUp, logIn, googleAuth, signout };
