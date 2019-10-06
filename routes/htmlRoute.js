const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", function(req, res) {
  db.Article.find({})
    .populate("comments")
    .then(data => {
      res.render("index", {articles: data});
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/article/:id", function(req, res) {
  db.Article.find({_id: req.params.id})
    .populate("comments")
    .then(data => {
      res.render("articleView", {article: data[0]});
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
