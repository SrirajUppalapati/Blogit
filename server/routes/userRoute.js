const express = require("express");
const { signUp, logIn, googleAuth } = require("../controllers/authController");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/login").post(logIn);

router.route("/google").post(googleAuth);
//Restict user data to only admins for all the below routes

router.route("/getAllUsers").get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
