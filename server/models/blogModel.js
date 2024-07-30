const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const validator = require("validator");
const User = require("./userModel");

const blogSchema = mongoose.Schema(
  {
    blogId: { type: String },
    title: {
      type: String,
      required: [true, "Please add a title."],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9 ,\-]+$/, "Title should be alphanumeric."],
    },
    banner: {
      type: String,
      required: [true, "Please add a banner."],
      trim: true,
      validate: [validator.isURL, "Banner should a url"],
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true,
      required: [true, "Please add a description."],
    },
    content: {
      type: [],
      lowercase: true,
      required: [true, "Please add some content."],
    },
    tags: {
      type: [String],
      required: [true, "Please add a few tags."],
      validate: {
        validator: function (val) {
          return val.length >= 3 && val.length <= 5;
        },
        message: "You should add between 3 and 10 tags.",
      },
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide an author."],
      ref: "users",
    },
    activity: {
      totalLikes: {
        type: Number,
        default: 0,
      },
      totalComments: {
        type: Number,
        default: 0,
      },
      totalReads: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "comments",
    },
    repliedTo: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

blogSchema.set({ timeStamps: true });

blogSchema.pre("save", async function () {
  const temp = this.title.split(" ").splice(0, 3).join("-");
  const blogid = temp + "-" + Date.now();
  this.blogId = slugify(blogid, {
    lower: true,
    trim: true,
    strict: true,
  });
});
blogSchema.post("save", async function () {
  const user = await User.findByIdAndUpdate(
    this.author,
    {
      $inc: { "accountInfo.totalPosts": 1 },
      $push: { blogs: this._id },
    },
    { new: true, runValidators: true }
  );
});
const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
