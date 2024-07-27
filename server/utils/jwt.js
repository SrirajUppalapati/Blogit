const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("./appError");
const catchAsync = require("./catchAsync");

const createAndSendJWT = (user, res, statusCode) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  if (!token) {
    return new AppError("Could not create token.", 400);
  }

  const cookieOptions = {
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("token", cookieOptions);
  res.status(statusCode).json({ status: "success", token, data: user });
};

const verifyJWT = catchAsync(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return next(new AppError("Please login!", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
});

module.exports = { createAndSendJWT, verifyJWT };
