var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
var app = express();   
mongoose.connect("mongodb://localhost/auth_demo_app");


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "The secret of the world is 46",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// This encodes and decodes the information. Methods come with passport local mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/////////////////
// Routes ///////
/////////////////

app.get("/", function(req, res){
    res.render("home");
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth routes

// show sign up form
app.get("/register", function(req, res){
    res.render("register");
});



// handlling user sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
       if (err){
           console.log(err);
           return res.render('register');
       }
       passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
       })
    });
})


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect ("/login");
}
// LOGIN ROUTES

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect: "/secret", 
    failureRedirect:"/login"
}), function(req, res){
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})


// Listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});