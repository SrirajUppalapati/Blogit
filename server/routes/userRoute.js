const express = require("express");
const {
  signUp,
  logIn,
  protectAccess,
  verifyRoles,
  isLoggedIn,
} = require("../controllers/authController");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signUp);

router.route("/login").post(logIn);

//Protect the access for all the below routes
router.use(isLoggedIn);

//Restict user data to only admins for all the below routes

router.use(verifyRoles("admin", "user"));

router.route("/getAllUsers").get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
