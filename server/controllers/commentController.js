const catchAsync = require("../utils/catchAsync");
const Comment = require("../models/commentModel");

const createComment = catchAsync(async (req, res, next) => {
  const { authorId, blogId, comment } = req.body;
  let parent;
  let isReply = false;
  if (req.body.parent) {
    parent = req.body.parent;
    isReply = true;
  }

  const data = await Comment.create({
    authorId,
    blogId,
    userId: req.user.id,
    comment,
    parent,
    isReply,
  });

  if (parent) {
    await Comment.findByIdAndUpdate(
      { _id: parent },
      { $push: { children: data._id } }
    );
  }

  if (!data) {
    return next(new AppError("Couldn't create the comment.", 400));
  }

  res.status(200).json({ message: "success", data });
});

const getAllComments = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const data = await Comment.find({ blogId, isReply: false })
    .sort({ createdAt: -1 })
    .populate("userId", "profilePicture name username");

  res.status(200).json({ message: "success", result: data.length, data });
});

module.exports = { createComment, getAllComments };
