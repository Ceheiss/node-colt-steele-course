// Dependencies
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// App Config
mongoose.connect("mongodb://localhost/adopt_dog");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride('_method'));

// Schema Setup
var dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    image: String,
    contact: String
});

var Dog = mongoose.model("Dog", dogSchema);

// Restful Routes

app.get("/", function(req, res){
    res.redirect("/dogs");
})

// Index Route
app.get("/dogs", function(req, res){
    Dog.find({}, function(err, dogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {dogs:dogs})
        }
    })
})

// New Route
app.get("/dogs/new", function(req, res) {
    res.render("new");
})

// Create Route
app.post("/dogs", function(req, res){
    var formData = req.body.dog;
    Dog.create(formData, function(err, newDog){
        console.log(newDog);
        if(err){
            console.log(err)
            res.render("new")
        } else {
            res.redirect("/dogs");
        }
    });
});

// Show
app.get("/dogs/:id", function(req, res){
    Dog.findById(req.params.id, function(err, dog){
        if (err){
            res.redirect("/");
        } else {
            res.render("show", {dog:dog});
        }
    })
})

// Edit 
app.get("/dogs/:id/edit", function(req, res) {
    Dog.findById(req.params.id, function(err, dog){
        if (err){
            res.redirect("/dogs/:id")
            console.log(err);
        } else {
            res.render("edit", {dog:dog})
        }
    })
})

// update
app.put("/dogs/:id", function(req, res){
    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, dog){
        if (err){
            console.log(err)
            res.redirect("/");
        } else {
            var showUrl = "/dogs/" + dog._id;
            res.redirect(showUrl);
        }
    })
})

// Delete
app.delete("/dogs/:id", function(req, res){
    Dog.findByIdAndRemove(req.params.id, function(err, dog){
        if (err){
            console.log(err);
            res.redirect("/");
        } else {
            dog.remove();
            res.redirect("/dogs");
        }
    })
})

// Listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Dog app server is ready!")
})