const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["like", "comment"],
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "blogs",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      lowercase: true,
      ref: "users",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
    repliedOnComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notifications", notificationSchema);

module.exports = Notification;
