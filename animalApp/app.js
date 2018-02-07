// Dependencies
var express = require("express");
var app = express();

// Routes
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
})

app.get("/speak/:animalName", function(req, res){
    // Good and cool, pero mucho mejor con un objeto/diccionario
    var animal = req.params.animalName.toLowerCase();
    var sounds = {
        cow: "Moo",
        dog: "Woof-Woof!",
        pig: "Oink!",
        cat: "You suck"
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'" );
})

/*============ Version 1.0 ====================*/
// app.get("/speak/pig", function(req, res){
//     res.send("The pig says 'Oink'");
// })

// app.get("/speak/cow", function(req, res){
//     res.send("The cow says 'Moo'");
// })

// app.get("/speak/dog",function(req, res){
//     res.send("The dog says 'Woof Woof!'");
// })
/*============== Version 2.0 ===================*/
// app.get("/speak/:animalName", function(req, res){
//     // Good and cool, pero mucho mejor con un objeto/diccionario
//     var animal = req.params.animalName;
//     if (animal === "pig"){
//         res.send("The pig says 'Oink'");
//     } else if (animal === "cow") { 
//         res.send("The cow says 'Moo'");
//     } else if (animal === "dog"){
//         res.send("The dog says 'Woof Woof'");
//     }
// })



app.get("/repeat/:word/:times", function(req, res){
    var word = req.params.word;
    var times = Number(req.params.times); // make it a number
    var repetition = "";
    for (var i = 0; i < times; i ++){
        repetition += (word + " ");
    }
    res.send(repetition); // this runs only once, not like console.log
})

/*================= version antigua =================*/
// app.get("/repeat/hello/3", function(req, res){
//     res.send("hello hello hello");
// })

// app.get("/repeat/hello/5", function(req, res){
//     res.send("hello hello hello hello hello");
// })

// app.get("/repeat/blah/2", function(req, res){
//     res.send("blah blah");
// })

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
})





// Server started 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running!");
})