const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", function(req, res) {
  db.Article.find({})
    .populate("comments")
    .then(data => {
      res.render("index", {articles: data});
    });
});

module.exports = router;
