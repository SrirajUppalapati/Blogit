const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const getUser = catchAsync(async (req, res, next) => {
  const data = await User.find({ username: req.params.username })
    .populate({
      path: "blogs",
      select: "-author",
      options: { sort: { updatedAt: -1, createdAt: -1 } },
    })
    .select("-password -_id -role");

  if (!data.length) {
    return next(
      new AppError(`No document found with id ${req.params.username}`, 404)
    );
  }

  res.status(200).send({
    status: "success",
    data: data,
  });
});

const updateProfile = catchAsync(async (req, res, next) => {
  const { name, email, username, bio, profilePicture, socialLinks } = req.body;
  const data = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, username, bio, profilePicture, socialLinks },
    { new: true, runValidators: true }
  ).select("-password -_id -role");

  if (!data) {
    return next(new AppError(`Please login to access the profile!`, 400));
  }

  res.status(200).json({ status: "success", data });
});

const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select("password");

  if (!user || !(await user.checkPassword(currentPassword, user.password))) {
    return next(
      new AppError("Incorrect current password, please try again!", 400)
    );
  }

  const data = await User.findByIdAndUpdate(
    req.user.id,
    { password: newPassword },
    { new: true, runValidators: true }
  );

  if (!data) {
    return next(new AppError(`Please login to access the profile!`, 400));
  }

  res
    .status(200)
    .json({ status: "success", message: "Password successfully updated!" });
});

module.exports = { getUser, updateProfile, updatePassword };
