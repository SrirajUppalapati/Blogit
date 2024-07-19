const express = require("express");
const {
  signUp,
  logIn,
  googleAuth,
  signout,
} = require("../controllers/authController");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyJWT } = require("../utils/jwt");

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/login").post(logIn);

router.route("/google").post(googleAuth);

router.route("/signout").post(signout);

router.route("/getAllUsers").get(getAllUsers);

router
  .route("/:id")
  .get(getUser)
  .patch(verifyJWT, updateUser)
  .delete(deleteUser);

module.exports = router;
