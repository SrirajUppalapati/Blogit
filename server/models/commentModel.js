const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    blogAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    comment: {
      type: String,
      required: true,
    },
    children: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "comments",
    },
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    isReply: {
      type: Boolean,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  },
  { timeStamps: true }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
