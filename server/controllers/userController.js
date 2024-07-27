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

  if (!data) {
    return next(
      new AppError(`No document found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).send({
    status: "success",
    data: data,
  });
});

module.exports = { getUser };
