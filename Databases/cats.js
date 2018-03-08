var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app"); // connect to db

 // Cat should be defined like this:
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// Compiled into a model and saved to variable Cat. Now I can Cat.create, Cat.update etc... "Cat" is the singular version of the collection
// So collecton will be like db.cats
var Cat = mongoose.model("Cat", catSchema); 

// adding a new cat to the DB

// var george = new Cat({
//     name: "Mrs.Norris",
//     age: 7,
//     temperament: "Evil"
// })


// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong!");
//     } else {
//         console.log("We just saved a cat to the DB");
//         console.log(cat);
//     }
// });

// Make new one and save in the DB
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if (err){
         console.log("Something went wrong");
        console.log(err);
    } else {
        console.log(cat);
    }
});

// retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no, error!");
        console.log(err);
    } else{
        console.log("All cats");
        console.log(cats);
    }
})

// We get an array