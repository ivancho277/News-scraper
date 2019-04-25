//TODO:
//Post route to save article from reddit to db

//TODO:
//get route to grab article from db and save to users articles

// TODO:
//get all from db
app.get("/all", (req, res) => {
    db.scrapedData.find({}, (err, data) => {
        if (err) throw err
        else {
            res.json(data);
        }
    })
})

//TODO:
//Delete route to get rid of article

// TODO:
//get route for scraping
var results = [];
app.get("/scrape", (req, res) => {
    axios.get("https://old.reddit.com/r/javascript/").then(function (response) {

        // Load the Response into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var results = [];

        // With cheerio, find each p-tag with the "title" class
        // (i: iterator. element: the current element)
        $("p.title").each(function (i, element) {
            // Save the text of the element in a "title" variable
            var title = $(element).text();
            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).children().attr("href");
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: link
            });
        });
    });
    //res.json(collections);
    // Log the results once you've looped through each of the elements found with cheerio
    //console.log(results);
});
res.json(collections);