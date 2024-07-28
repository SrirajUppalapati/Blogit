const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

const searchTags = catchAsync(async (req, res, next) => {
  const tagsQuery = req.query.q || "";

  const data = await Blog.aggregate([
    { $unwind: "$tags" },
    {
      $match: {
        tags: { $regex: tagsQuery, $options: "i" },
      },
    },
    {
      $group: {
        _id: null,
        tags: { $addToSet: "$tags" },
      },
    },
  ]);

  res.status(200).json({ staus: "success", result: data.length, data });
});

const searchTitle = catchAsync(async (req, res, next) => {
  const search = req.query.q || "";

  let query = Blog.find({
    title: { $regex: search, $options: "i" },
  })
    .populate("author", "username name profilePicture")
    .select("title description blogId updatedAt createdAt")
    .sort({ updatedAt: -1 });

  const data = await query;

  res.status(200).json({ status: "success", results: data.length, data });
});

searchUser = catchAsync(async (req, res, next) => {
  const user = req.query.q || "";

  let query = User.find({ name: { $regex: user, $options: "i" } }).select(
    "name username profilePicture bio"
  );

  const page = req.query.page * 1 || 1;
  const limit = 7;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const data = await query;
  res.status(200).json({ status: "success", results: data.length, data });
});

module.exports = { searchTags, searchTitle, searchUser };
