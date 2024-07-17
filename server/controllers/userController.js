const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const CRUDhelpers = require("./CRUDhelpers");

//Filter the req.body with only required fields and remove the rest
const filterObj = (body, ...required) => {
  const keys = Object.keys(body);
  keys
    .filter((curr) => required.includes(curr))
    .forEach((curr) => delete body[curr]);

  return body;
};

//Get user data after login --User only
exports.getMyProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password -role");

  res.status(201).json({ status: "success", data: user });
});

//Update user data after login --User only
exports.updateMyProfile = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "password",
    "googleAuth",
    "role",
    "password"
  );
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(
      new AppError(`The is no user with the id ${req.params.id}`, 400)
    );
  }
  res.status(201).json({ status: "success", data: user });
});

//Get all users --Admin Only
const getAllUsers = CRUDhelpers.getAll(User);

//Get get one user --Admin Only
const getUser = CRUDhelpers.getOne(User);

//Update user --Admin Only
const updateUser = CRUDhelpers.updateOne(User);

//Delete user --Admin Only
const deleteUser = CRUDhelpers.deleteOne(User);

module.exports = { getAllUsers, getUser, updateUser, deleteUser };
