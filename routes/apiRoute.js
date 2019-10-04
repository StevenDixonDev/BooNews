const express = require("express");
const db = require("../models");
const router = express.Router();
const cheerio = require("cheerio");
const axios = require("axios");

db.Article.deleteMany({}).then(data => {
  console.log(data);
});

router.get("/users", function(req, res) {
  db.User.find({}).then(data => {
    res.json(data);
  });
});

router.get("/article", function(req, res) {
  db.Article.find({}).then(data => {
    res.json(data);
  });
});

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

module.exports = router;
