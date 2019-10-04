const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", function(req, res) {
  db.User.find({}).then(data => {
    console.log(data);
    res.render("index", data);
  });
});

module.exports = router;
