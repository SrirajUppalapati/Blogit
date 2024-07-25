const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");

const createAndSendJWT = (user, res, statusCode, req) => {
  //Create a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  if (!token) {
    return new AppError("Could not create token.", 400);
  }
  user.password = undefined;

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("access_token", token, cookieOptions);

  res
    .status(statusCode)
    .json({ status: "success", access_token: token, data: user });
};

const verifyJWT = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Please login!", 400));
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user) {
    return next(new AppError("Please login!", 400));
  }
  req.user = user;
  // console.log(user);
  next();
});

module.exports = { createAndSendJWT, verifyJWT };
