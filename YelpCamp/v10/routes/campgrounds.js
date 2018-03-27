var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX = show all campgrounds
router.get("/", function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author:author};
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
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
})

// SHOW - Shows info about one particular campground
router.get("/:id", function(req, res) {
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

// Edit Campground Route
router.get("/:id/edit", function(req, res){
    // is iser logged in?
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            // does user own a campground?
            if(foundCampground.author.id.equals(req.user._id)){
                res.render("campgrounds/edit", {campground:foundCampground});
            } else {
                res.send("You do not have permission to do that");
            }
            
        }
        });
    } else {
        console.log("You need to be logged in to do that");
        res.send("You need to be logged in to do that")
    }
        
        // Otherwise, redirect
    // If not, redirect
});


// Create Campground Route
router.put("/:id", function(req, res){
    // find and update the coorect campground
    Campground.findByIdAndUpdate(req.params.id,/*what are we finding*/req.body.campground,/*data that we wan to update*/function(err, updatedCampground){
        if (err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect somewhere
});

// Destroy campground route
router.delete("/:id", function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})


// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;