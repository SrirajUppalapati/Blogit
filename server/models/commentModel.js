const mongoose = require("mongoose");
const Blog = require("./blogModel");
const Notification = require("./notificationModel");

const commentSchema = mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

commentSchema.pre("save", async function () {
  await Blog.findOneAndUpdate(
    { _id: this.blogId },
    {
      $push: { comments: this._id },
      $inc: {
        "activity.totalComments": 1,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  await Notification.create({
    type: "comment",
    blogId: this.blogId,
    authorId: this.authorId,
    userId: this.userId,
    comment: this.comment,
  });
});

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
