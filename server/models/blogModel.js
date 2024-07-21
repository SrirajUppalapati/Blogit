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
      unique: [true, "Title should be unique."],
      trim: true,
      lowercase: true,
      match: [/^[A-Za-z0-9\s]+$/, "Title should be alphanumeric."],
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
      type: {},
      lowercase: true,
      required: [true, "Please add some content."],
    },
    tags: {
      type: [String],
      required: [true, "Please add a few tags."],
      validate: {
        validator: function (val) {
          return val.length >= 3 && val.length <= 10;
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
      total_likes: {
        type: Number,
        default: 0,
      },
      total_comments: {
        type: Number,
        default: 0,
      },
      total_reads: {
        type: Number,
        default: 0,
      },
      total_parent_comments: {
        type: Number,
        default: 0,
      },
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "comments",
    },
    draft: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

blogSchema.pre("save", function () {
  this.blogId = slugify(this.title, {
    lower: true,
    trim: true,
    strict: true,
  });
});

blogSchema.post("save", async function () {
  const incTotalPosts = this.draft ? 1 : 0;
  const user = await User.findByIdAndUpdate(
    this.author,
    {
      $inc: { "accountInfo.totalPosts": incTotalPosts },
      $push: { blogs: this._id },
    },
    { new: true, runValidators: true }
  );
});
const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
