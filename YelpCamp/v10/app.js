// Declarations - Requirements
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"), // Store the function
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override");


var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//seedDB(); // This will seed the db when the server starts running. Executes the function
mongoose.connect("mongodb://localhost/yelp_camp"); // Connect to db
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // safe, __dirname targets the directory where the script lives in
app.set("view engine", "ejs");
app.use(methodOverride("_method"));


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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
    
//==========LISTENER====================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});