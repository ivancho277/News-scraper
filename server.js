var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 3000;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
//app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
mongoose.connect("mongodb://localhost/populate", { useNewUrlParser: true });

// Requiring our routes
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
  app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
