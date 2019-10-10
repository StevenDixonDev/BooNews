const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const Port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost/boonews";
mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbUrl, {useNewUrlParser: true});

if (process.env.ENVIRONMENT === "development") {
  mongoose.connection.dropDatabase();
}

app.get("/api/clear", function(req, res) {
  mongoose.connection.dropDatabase();
  res.send("done");
});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const htmlRoute = require("./routes/htmlRoute");
const apiRoute = require("./routes/apiRoute");

app.use("/", htmlRoute);
app.use("/api", apiRoute);

app.listen(Port, function() {
  console.log(`App running on port: ${Port}`);
});
