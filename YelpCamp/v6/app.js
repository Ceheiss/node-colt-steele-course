// Declarations - Requirements
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds"); // Store the function
var passport = require("passport");
var LocalStrategy = require("passport-local");

seedDB(); // This will seed the db when the server starts running. Executes the function
mongoose.connect("mongodb://localhost/yelp_camp"); // Connect to db
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "public")); // safe, __dirname targets the directory where the script lives in
app.set("view engine", "ejs");


// Passport Configuration
app.use(require("express-session")({
    secret: "One ring to rule them all",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // methods come with the npm passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// This middleware will run for every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
}) ;

////////////////////////////////////////////////////////////
//////////////////////////////ROUTES ///////////////////////
////////////////////////////////////////////////////////////
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

app.get("/campgrounds/:id/comments/new", isLoggedIn,function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});
        }
    });
 });
 
 app.post("/campgrounds/:id/comments", isLoggedIn,function(req, res){
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
    

//=====================================
//       AUTH ROUTES
//=====================================
// show register form
app.get("/register", function(req, res){
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
app.get("/login", function(req, res){
    res.render("login");
})

// handling login logic
// app.post(route, middleware, callback);
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "login"
    }), function(req, res){
})

// logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//==========LISTENER====================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});