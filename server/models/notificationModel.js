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
      ref: "users",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment: {
      type: String,
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
