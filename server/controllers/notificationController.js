const Notification = require("../models/notificationModel");
const catchAsync = require("../utils/catchAsync");

const allNotifications = catchAsync(async (req, res, next) => {
  const { type, seen } = req.query;

  let query = Notification.find({
    authorId: req.user.id,
    userId: { $ne: req.user.id },
  })
    .populate({ path: "userId", select: "username" })
    .populate({ path: "blogId", select: "title blogId" })
    .sort("createdAt");

  if (type) query = query.find({ type });
  if (seen !== undefined) query = query.find({ seen });

  const data = await query;
  res.status(200).json({ status: "success", results: data.length, data });
});

const checkSeen = catchAsync(async (req, res, next) => {
  const data = await Notification.find({
    authorId: req.user.id,
    seen: false,
    userId: { $ne: req.user.id },
  });

  res.status(200).json({ status: "success", data: data.length ? true : false });
});

const markRead = catchAsync(async (req, res, next) => {
  const data = await Notification.findOneAndUpdate(
    { _id: req.params.id },
    { seen: true },
    { new: true, runValidators: true }
  );

  if (!data) {
    return res
      .status(404)
      .json({ status: "fail", message: "Notification not found" });
  }

  res.status(200).json({ status: "success", data });
});
module.exports = allNotifications;

module.exports = { allNotifications, checkSeen, markRead };
