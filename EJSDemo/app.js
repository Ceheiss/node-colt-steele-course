var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(req, res){
   res.render("home.ejs"); 
});

app.get("/fallinlovewith/:thing", function(req, res){
   var thing = req.params.thing;
   res.render("love.ejs", {thingVar: thing}); // This sends to my love.ejs file that thingVar (variable used there) equals var thing
});

app.get("/posts", function(req, res){
   var posts = [
      {title: "Post 1", author: "Susy"},
      {title: "Post 2", author: "James"},
      {title: "Post 3", author: "Bernard"},
      ];
      
   res.render("posts.ejs", {posts: posts});
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening!");
});