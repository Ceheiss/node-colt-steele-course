// Declarations - Requirements
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds"); // Store the function

seedDB(); // This will seed the db when the server starts running. Executes the function
mongoose.connect("mongodb://localhost/yelp_camp"); // Connect to db
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
                res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
    res.render("campgrounds/new.ejs");
})

// SHOW - Shows info about one particular campground
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//=====================================
//       COMMENTS ROUTES
//=====================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});
        }
    });
 });
 
 app.post("/campgrounds/:id/comments", function(req, res){
     // lookup campground using id
     Campground.findById(req.params.id, function(err, campground){
         if (err){
             console.log(err);
             res.redirect("/campgrounds");
         } else {
             Comment.create(req.body.comment, function(err, comment){
                 if(err){
                     console.log(err);
                 } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id)
                 }
             })
         }
     })
     // create new comment
     // connect new comment to campground
     // redirect to campground showpage
     
 })
    



//==========LISTENER====================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});