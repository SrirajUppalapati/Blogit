const express = require("express");
const { verifyJWT } = require("../utils/jwt");
const {
  createComment,
  getAllComments,
  createReply,
} = require("../controllers/commentController");

const router = express.Router();

router.route("/:blogId").get(getAllComments);

router.use(verifyJWT);

router.route("/addcomment").post(createComment);

module.exports = router;
