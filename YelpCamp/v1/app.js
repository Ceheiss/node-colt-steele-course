var express = require("express");
var app = express();
var bodyParser = require("body-parser");

 var campgrounds = [
            {name:"Salmon Creek", image:"http://weknowyourdreams.com/images/camping/camping-14.jpg"},
            {name:"Granite Hills", image:"http://weknowyourdreams.com/images/camping/camping-07.jpg"},
            {name:"Mountain Goat's rest", image:"http://weknowyourdreams.com/images/camping/camping-03.jpg"},
            {name:"Salmon Creek", image:"http://weknowyourdreams.com/images/camping/camping-14.jpg"},
            {name:"Granite Hills", image:"http://weknowyourdreams.com/images/camping/camping-07.jpg"},
            {name:"Mountain Goat's rest", image:"http://weknowyourdreams.com/images/camping/camping-03.jpg"},
            {name:"Salmon Creek", image:"http://weknowyourdreams.com/images/camping/camping-14.jpg"},
            {name:"Granite Hills", image:"http://weknowyourdreams.com/images/camping/camping-07.jpg"},
            {name:"Mountain Goat's rest", image:"http://weknowyourdreams.com/images/camping/camping-03.jpg"}
        ]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
        res.render("campgrounds", {campgrounds:campgrounds}); // That is an object that is used to pass the data we want to pass through
});

app.post("/campgrounds", function(req, res){
   // get data from form and ass to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   // redirect back to campgrounds page
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});