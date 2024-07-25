const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { verifyJWT, createAndSendJWT } = require("../utils/jwt");
const Blog = require("../models/blogModel");
const CRUDhelpers = require("./CRUDhelpers");

const getAllBlogs = catchAsync(async (req, res, next) => {
  let query = Blog.find({ draft: false })
    .populate({
      path: "author",
      select: "name email username profilePicture -_id",
    })
    .sort({ updatedAt: -1 });

  const queryObj = { ...req.query };

  const excludeFilters = ["sort", "page", "limit", "fields"];

  excludeFilters.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = JSON.parse(
    queryStr.replace(/\b(gte|lte|gt|lt|ne)\b/g, (curr) => `$${curr}`)
  );

  query = query.find(queryStr);

  const page = req.query.page * 1 || 1;
  const limit = 7;

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
  const data = await Blog.find({ draft: false })
    .populate({
      path: "author",
      select: "name email username profilePicture -_id",
    })
    .sort({ "activity.total_reads": -1, total_likes: -1, updatedAt: -1 })
    .limit(10);

  res.status(200).json({
    status: "success",
    data,
  });
});

const getOneBlog = catchAsync(async (req, res, next) => {
  const { blogId } = req.params.blogId;
  const data = Blog.find({ blogId });
  if (!data) {
    return next(
      new AppError(`No document found with id ${req.params.blogId}`, 404)
    );
  }

  res.status(200).send({
    status: "success",
    data: data,
  });
});

const createBlog = catchAsync(async (req, res, next) => {
  const { title, banner, description, content, tags, draft } = req.body;
  const blog = await Blog.create({
    title,
    banner,
    description,
    content,
    tags,
    author: req.user.id,
    draft,
  });

  if (!blog) {
    return next(new AppError("Couldnt create the blog.", 400));
  }
  res.status(201).json({ message: "success", data: blog });
});

const updateBlog = catchAsync(async (req, res, next) => {
  if (req.params.activity.total_likes) {
  }
  await Blog.findOneAndUpdate(
    { blogId: req.params.blogId, author: req.user.id },
    req.params,
    {
      new: true,
      runValidators: true,
    }
  );
});

const getTopTenTags = catchAsync(async (req, res, next) => {
  const topTen = await Blog.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  res.status(200).json({ data: topTen });
});

module.exports = {
  createBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
  getTopTenTags,
  getTrendingBlogs,
};
