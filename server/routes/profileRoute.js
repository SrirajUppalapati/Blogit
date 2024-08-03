const express = require("express");
const {
  updateProfile,
  updatePassword,
  userBlogs,
} = require("../controllers/userController");
const { verifyJWT } = require("../utils/jwt");

const router = express.Router();
router.use(verifyJWT);

router.route("/updateprofile").patch(updateProfile);

router.route("/updatepassword").patch(updatePassword);

router.route("/blogs").get(userBlogs);

module.exports = router;
