const express = require("express");
const { verifyJWT } = require("../utils/jwt");
const {
  createComment,
  getAllComments,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.route("/:blogId").get(getAllComments);

router.use(verifyJWT);

router.route("/addcomment").post(createComment);

router.route("/deletecomment/:id").delete(deleteComment);

module.exports = router;
