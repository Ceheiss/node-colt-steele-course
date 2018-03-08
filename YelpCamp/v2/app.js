// Declarations - Requirements
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp"); // Connect to db
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/* ---------- HARDCODED ----------------*/
// Campground.create(
//     {
//         name:"Granite Hills", 
//         image:"http://weknowyourdreams.com/images/camping/camping-07.jpg",
//         description: "Huge granite hill without water, just rocks and granite (beatiful though)"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log('Newly Created Campground');
//             console.log(campground);
//         }
//     });

// ROUTES

app.get("/", function(req, res){
    res.render("landing");
});
//INDEX = show all campgrounds
app.get("/campgrounds", function(req, res){
        // Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("index", {campgrounds:allCampgrounds});
            }
        })
});

// CREATE = Add campgrounds to database
app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   // Create a new background and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            res.redirect("/campgrounds");
       }
   })
});

//NEW = Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

// SHOW - Shows info about one particular campground
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});