const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

const Port = process.env.PORT || 3000;

// const db = require("./models");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost/boonews";
mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbUrl, {useNewUrlParser: true});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const htmlRoute = require("./routes/htmlRoute");
const apiRoute = require("./routes/apiRoute");

app.use("/", htmlRoute);
app.use("/api", apiRoute);

app.listen(Port, function() {
  console.log(`App running on port: ${Port}`);
});
