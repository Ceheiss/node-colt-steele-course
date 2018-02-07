var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"]; // For now moved here for scope. Later, with database, is not an issue

app.get("/", function(req, res){
    res.render("home");
})

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
})

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newFriend; // That's how you access the value entered in the form
    friends.push(newFriend);
    res.redirect("/friends");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!!");
});