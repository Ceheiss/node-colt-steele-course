// DEPENDENCIES
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

// APP CONFIG
mongoose.connect("mongodb://localhost/pokemon_app");
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

// SCHEMA
var pokemonSchema = new mongoose.Schema({
    picture: String,
    name: String,
    type: String,
    index: Number,
    description: String
})

var Pokemon = mongoose.model("Pokemon", pokemonSchema);


// RESTful Routes
app.get("/", function(req, res){
    res.render("home");
})

// Index
app.get("/pokemons", function(req, res){
    Pokemon.find({}, function(err, pokemons){
        if(err){
            console.log(err);
        } else {
            res.render("index", {pokemons:pokemons});
        }
    });
});

// New
app.get("/pokemons/new", function(req, res){
    res.render("new");
})

/* Create
Pokemon.create({
    picture: "https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png",
    name: "Bulbasaur",
    type: "Grass, Poison",
    index: 1,
    description: "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger."
})*/


// Create
app.post("/pokemons", function(req, res){
    var formData= req.body.pokemon;
    Pokemon.create(formData, function(err, newPokemon){
        console.log(newPokemon);
        if(err){
            res.render("New");
        } else {
            res.redirect("/pokemons");
        }
    });
});

// Show
app.get("/pokemons/:id", function(req, res){
    Pokemon.findById(req.params.id, function(err, pokemon){
        if(err){
            res.redirect("/pokemons");
        } else {
            res.render("show", {pokemon:pokemon});
        }
    })
})

// Edit
app.get("/pokemons/:id/edit", function(req, res){
    Pokemon.findById(req.params.id, function(err, pokemon){
        if(err){
            console.log(err)
        } else {
            res.render("edit", {pokemon:pokemon})
        }
    })
})

// Update
app.put("/pokemons/:id", function(req, res){
    Pokemon.findByIdAndUpdate(req.params.id, req.body.pokemon, function(err, updatePokemon){
        if(err){
            console.log(err);
        } else {
            var showUrl = "/pokemons/" + req.params.id;
            res.redirect(showUrl);
        }
    })
})

// Destroy
app.delete("/pokemons/:id", function(req, res){
    Pokemon.findByIdAndRemove(req.params.id, function(err, pokemon){
        if (err){
            console.log(err);
        } else {
            pokemon.remove();
            res.redirect("/pokemons");
        }
    })
})

// LISTENER
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Catch 'em all. Pokemon server running");
})