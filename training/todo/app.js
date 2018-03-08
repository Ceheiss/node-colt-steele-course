// Dependencies
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");

// App Configuration
mongoose.connect("mongodb://localhost/todo_app");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));

// Schema Setup
var todoSchema = new mongoose.Schema({
    title: String,
    body: String
});

var Todo = mongoose.model("Todo", todoSchema);


// Routes
app.get("/", function(req, res){
    res.redirect("/todos");
})

// Index
app.get("/todos", function(req, res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log(err);
        } else {
            res.render("index", {todos:todos});
        }
    });
});

// New
app.get("/todos/new", function(req, res){
    res.render("new");
});

// Create
app.post("/todos", function(req, res){
    
    var formData = req.body.todo;
    Todo.create(formData, function(err, newTodo){
        console.log(newTodo);
        if(err){
            res.render("new");
        } else {
            res.redirect("/todos");
        }
    });
});

// Show
app.get("/todos/:id", function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render("show", {todo:todo})
        }
    })
})

// Edit
app.get("/todos/:id/edit", function(req, res){
    Todo.findById(req.params.id, function(err, todo){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.render ("edit", {todo:todo})
        }
    })
})

// Update
app.put("/todos/:id", function(req, res){
    Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, todo){
        if(err){
            console.log(err);
        } else {
            var showUrl = "/todos/" + todo._id;
            res.redirect(showUrl);
        }
    })
})

// Delete
app.delete("/todos/:id", function(req, res){
    Todo.findByIdAndRemove(req.params.id, function(err, todo){
        if(err){
            console.log(err);
        } else {
            todo.remove();
            res.redirect("/");
        }
    })
})


// Listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Todo App server is running!");
})