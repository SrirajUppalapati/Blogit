const express = require("express");
const { verifyJWT } = require("../utils/jwt");
const {
  createBlog,
  getAllBlogs,
  getOneBlog,
  updateBlog,
  getTopTenTags,
  getTrendingBlogs,
  deleteBlog,
  likeBlog,
  checkLiked,
} = require("../controllers/blogController");

const router = express.Router();

router.route("/allblogs").get(getAllBlogs);

router.route("/allblogs/:blogId").patch(getOneBlog);

router.route("/toptentags").get(getTopTenTags);

router.route("/trendingblogs").get(getTrendingBlogs);

router.use(verifyJWT);

router.route("/checkliked").post(checkLiked);

router.route("/likeblog").patch(likeBlog);

router.route("/createblog").post(createBlog);

router.route("/:blogId").patch(updateBlog).delete(deleteBlog);

module.exports = router;
