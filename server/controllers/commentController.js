const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");
const Notification = require("../models/notificationModel");
const AppError = require("../utils/appError");

const createComment = catchAsync(async (req, res, next) => {
  const { authorId, blogId, comment } = req.body;

  const data = await Comment.create({
    authorId,
    blogId,
    userId: req.user.id,
    comment,
  });

  if (!data) {
    return next(new AppError("Couldn't create the comment.", 400));
  }

  res.status(200).json({ message: "success", data });
});

const getAllComments = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const data = await Comment.find({ blogId })
    .sort({ createdAt: -1 })
    .populate("userId", "profilePicture name username");

  res.status(200).json({ message: "success", result: data.length, data });
});

const deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = await Comment.findOneAndDelete({ _id: id });

  if (data) {
    await Blog.findOneAndUpdate(
      { _id: data.blogId },
      {
        $inc: {
          "activity.totalComments": -1,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    await Notification.findOneAndDelete({ comment: data._id });
  } else {
    return next(new AppError("Please check your commentId.", 400));
  }

  res.status(200).json({ message: "success", data });
});

module.exports = { createComment, getAllComments, deleteComment };
