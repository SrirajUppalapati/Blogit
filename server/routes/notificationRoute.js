const express = require("express");
const { verifyJWT } = require("../utils/jwt");
const {
  allNotifications,
  checkSeen,
  markRead,
} = require("../controllers/notificationController");

const router = express.Router();

router.use(verifyJWT);

router.route("/allnotifications").get(allNotifications);

router.route("/checkseen").get(checkSeen);

router.route("/:id").patch(markRead);

module.exports = router;
