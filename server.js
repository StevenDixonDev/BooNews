const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

const Port = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost/";

mongoose.connect(dbUrl, {useNewUrlParser: true});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  db.User.find({}).then(data => {
    console.log(data);
    res.render("index", data);
  });
});

app.listen(Port, function() {
  console.log(`App running on port: ${Port}`);
});
