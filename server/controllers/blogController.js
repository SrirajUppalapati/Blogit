const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Blog = require("../models/blogModel");
const Notification = require("../models/notificationModel");

const getAllBlogs = catchAsync(async (req, res, next) => {
  let query;
  if (req.query.tags) {
    query = Blog.find({ tags: req.query.tags });
  } else {
    query = Blog.find();
  }
  query
    .populate({
      path: "author",
      select: "name email username profilePicture -_id",
    })
    .sort({ createdAt: -1 });

  const page = req.query.page * 1 || 1;
  const limit = 15;

  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const data = await query;

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

const getTrendingBlogs = catchAsync(async (req, res, next) => {
  const data = await Blog.find({
    createdAt: { $gt: new Date("2024-01-01T00:00:00Z") },
  })
    .populate({
      path: "author",
      select: "name email username profilePicture -_id",
    })
    .sort({ "activity.totalReads": -1, totalLikes: -1, createdAt: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    data,
  });
});

const getOneBlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  const { mode } = req.query;
  const incimentValue = mode === "edit" ? 0 : 1;
  let blog = await Blog.findOneAndUpdate(
    { blogId },
    { $inc: { "activity.totalReads": incimentValue } },
    { new: true, runValidators: true }
  )
    .populate("author", "name profilePicture username activity socialLinks")
    .select(
      "blogId title banner description content tags activity.totalLikes activity.totalComments activity.totalReads createdAt"
    );

  if (!blog) {
    return next(new AppError(`No blog found.`, 404));
  }

  res.status(200).send({
    status: "success",
    data: blog,
  });
});

const createBlog = catchAsync(async (req, res, next) => {
  let { title, banner, description, content, tags } = req.body;
  const blog = await Blog.create({
    title,
    banner,
    description,
    content,
    tags,
    author: req.user.id,
  });

  if (!blog) {
    return next(new AppError("Couldn't create the blog.", 400));
  }
  res.status(201).json({ message: "success", data: blog });
});

const updateBlog = catchAsync(async (req, res, next) => {
  const { title, content, description, tags, banner } = req.body;
  const blog = await Blog.findOneAndUpdate(
    { blogId: req.params.blogId, author: req.user.id },
    { title, content, description, tags, banner, updatedAt: Date.now },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!blog) {
    return next(new AppError("Couldnt update the blog.", 400));
  }

  res.status(201).json({ message: "success", data: blog });
});

const getTopTenTags = catchAsync(async (req, res, next) => {
  const topTen = await Blog.aggregate([
    {
      $match: {
        createdAt: { $gt: new Date("2024-01-01T00:00:00Z") },
      },
    },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({ data: topTen });
});

const likeBlog = catchAsync(async (req, res, next) => {
  const { blogId, likedByUser } = req.body;
  const val = likedByUser ? 1 : -1;
  const liked = await Blog.findOneAndUpdate(
    { _id: blogId },
    { $inc: { "activity.totalLikes": val } },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("author")
    .select("activity.totalLikes");

  if (!liked) {
    return next(new AppError("You are not the correct user."), 400);
  }
  let data;
  if (likedByUser) {
    data = await Notification.create({
      type: "like",
      blogId,
      authorId: liked.author._id,
      userId: req.user.id,
    });
  } else {
    data = await Notification.findOneAndDelete({
      type: "like",
      blogId,
      authorId: liked.author._id,
      userId: req.user.id,
    });
  }
  if (!data) {
    return next(new AppError("Couldn't create the notification.", 400));
  }
  res.status(200).json({ message: "success", data });
});

const checkLiked = catchAsync(async (req, res, next) => {
  const { blogId } = req.body;
  const data = await Notification.findOne({
    _id: blogId,
    userId: req.user.id,
    type: "like",
  });

  res.status(200).json({ status: "success", result: data ? true : false });
});

const deleteBlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params;
  await Blog.findOneAndDelete({
    blogId,
  });

  res.status(200).json({ status: "success" });
});
module.exports = {
  createBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
  getTopTenTags,
  getTrendingBlogs,
  likeBlog,
  checkLiked,
  deleteBlog,
};
