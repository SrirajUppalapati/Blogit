const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { verifyJWT, createAndSendJWT } = require("../utils/jwt");
const Blog = require("../models/blogModel");

const createBlog = catchAsync(async (req, res, next) => {
  const { title, banner, description, content, tags } = req.body;

  const draft = req.body.draft || false;

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

module.exports = { createBlog };
