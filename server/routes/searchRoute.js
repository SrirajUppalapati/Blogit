const express = require("express");
const {
  searchTags,
  searchTitle,
  searchUser,
} = require("../controllers/searchController");

const router = express.Router();

router.route("/tags").get(searchTags);

router.route("/title").get(searchTitle);

router.route("/user").get(searchUser);

module.exports = router;
