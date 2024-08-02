const express = require("express");
const {
  signUp,
  logIn,
  googleAuth,
  signout,
} = require("../controllers/authController");
const { getUser, updateProfile } = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/login").post(logIn);

router.route("/google").post(googleAuth);

router.route("/signout").post(signout);

router.route("/:username").get(getUser);

module.exports = router;
