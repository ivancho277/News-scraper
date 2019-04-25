var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var mongojs = require("mongojs")

// Setting up port and requiring models for syncing

var PORT = process.env.PORT || 3000;
var db = require("./models");
//var databaseUrl = "scraper";
//var collections = ["scrapedData"];
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });
mongoose.connect("mongodb://localhost/articledb", {
  useNewUrlParser: true
});

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
//app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//home get route
app.get("/", (req, res) => {
  db.Article.find({}).then(data => {
    res.render("index", {
      article: data
    })
  })
})


// Requiring our routes
//require("./routes/api-routes.js")(app);


//TODO:
//Post route to save article from reddit to db

// TODO:
//get route to grab article from db and save to users articles
app.post("/userarticles", (res, req) => {

})



// TODO:
//get all from db
app.get("/all", (req, res) => {
  db.Article.find({}).then((data) => {
    res.json(data);
  }).catch(err => {
    res.json(err)
  })
})

//TODO:
//Delete route to get rid of article

  app.delete("/", (req, res) => {
    db.Article.deleteMany({}).then((data) => {
      res.json()
    });
  })

//TODO:
//get route for scraping
var results = [];
app.get("/scrape", (req, res) => {
  axios.get("https://old.reddit.com/r/javascript/").then(function (response) {

    // Load the Response into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape


    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("p.title").each(function (i, element) {
      // Save the text of the element in a "title" variable
      var title = $(element).text();
      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      var link = $(element).children().attr("href");
      var result = {};
      result.title = title;
      result.link = link;
      db.Article.create(result).then((dbArticle) => {
        console.log(dbArticle);
      }).catch(err => {
        console.log(err);
      })

      // Save these results in an object that we'll push into the results array we defined earlier
      // results.push({
      //   title: title,
      //   link: link
      // });
    });
  });
  //res.json(collections);
  // Log the results once you've looped through each of the elements found with cheerio
  //console.log(results);
  setTimeout(() => {res.redirect('/')}, 300);
});
//res.json(collections);









// Syncing our database and logging a message to the user upon success
app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});