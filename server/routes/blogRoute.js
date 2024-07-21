const express = require("express");
const { verifyJWT } = require("../utils/jwt");
const { createBlog } = require("../controllers/blogController");

const router = express.Router();

router.use(verifyJWT);

router.route("/createblog").post(createBlog);

module.exports = router;
