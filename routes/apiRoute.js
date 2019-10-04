const express = require("express");
const db = require("../models");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");

// get list of all users
router.get("/users", function(req, res) {
  db.User.find({}).then(data => {
    res.json(data);
  });
});

// get list of all articles
router.get("/article", function(req, res) {
  db.Article.find({}).then(data => {
    res.json(data);
  });
});

// get list of all articles with their comments
router.get("/articlewithcomment", function(req, res) {
  db.Article.find({})
    .populate("comments")
    .then(data => {
      res.json(data);
    });
});

// use cheerio and axios to scrape the site
router.get("/scrape", function(req, res) {
  axios
    .get("https://www.livescience.com/strange-news")
    .then(function(response) {
      const $ = cheerio.load(response.data);

      $("article").each(function() {
        let result = {};
        result.title = $(this)
          .find(".article-name")
          .text()
          .trim();
        result.byline = $(this)
          .find(".byline")
          .text()
          .trim();
        result.synopsis = $(this)
          .find(".synopsis")
          .text()
          .trim();
        result.url = $(this)
          .parent()
          .attr("href");
        db.Article.create(result).catch(err => {
          res.json(err);
        });
      });

      res.send("ok");
    });
});

// add a comment to an article using post
router.post("/addcomment/:id", function(req, res) {
  db.Comment.create(req.body)
    .then(data => {
      return db.Article.findOneAndUpdate(
        {_id: req.params.id},
        {$push: {comments: data._id}},
        {new: true}
      );
    })
    .then(Articles => {
      res.json(Articles);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
