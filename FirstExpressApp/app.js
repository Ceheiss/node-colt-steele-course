/*=========================================================
-----------------------SETUP-----------------------------
=========================================================*/
var express = require("express");
var app = express();
/*=========================================================
-----------------------ROUTES-----------------------------
=========================================================*/
// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
})
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
})
// "/dog" => "MEOW!"
app.get("/dog", function(req, res){
    res.send("MEOW");
})
// For route parameters or path variables
app.get("/r/:subredditName", function(req, res){
    // use the user input
    var subreddit = req.params.subredditName;
    res.send("Welcome to the " + subreddit + " subreddit");
})
// More specific route parameters
app.get("/r/:subredditName/comments/:id/:title", function(req, res){
    res.send("Welcome to the comments section");
})
// A non-existing route
app.get("*", function(req, res){
    res.send("404 hommie, no idea");
})
/*=========================================================
------Tell Express to listen for requests (START SERVER)--
=========================================================*/

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
}); // is a variable with the port number, usually 3000 but this is Cloud 9

