const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/users", function(req, res) {
  db.User.find({}).then(data => {
    console.log(data);
    res.json(data);
  });
});

module.exports = router;
