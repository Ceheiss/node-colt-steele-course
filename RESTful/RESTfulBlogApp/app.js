/*========REQUIREMENTS===========*/
var express      = require("express"),
app              = express(),
bodyParser       = require("body-parser"),
mongoose         = require("mongoose"),
methodOverride   = require("method-override"),
expressSanitizer = require("express-sanitizer");

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // _method is looked in requests parameters
app.use(expressSanitizer());

// Moongose Schema - MONGOOSE/MODEL CONFIG
// Blog model will have: title, image and body (all strings) and created (date).
var blogSchema = new mongoose.Schema({
    title: String,
    image:String,
    body: String,
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
//     title: "Test Blog",
//     image: "https://vignette.wikia.nocookie.net/lotr/images/5/5e/PippinMoria.jpg/revision/latest?cb=20160811200409",
//     body: "Hello this is a blog post!"
// });

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
})

//INDEX
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("index", {blogs:blogs})
       }
   })
})

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
})

// CREATE ROUTE
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            // then, redirect to the index
            res.redirect("/blogs");
        }
    });
});


// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    // We need to find id, find corresponding blog and render the show template
    Blog.findById(req.params.id, function(err, foundBlog){  // Moongose method we use is .findById
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog})
        }
    }) 
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    })
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    https://blog.cristobalheiss.com/2018/03/04/the-path-is-dividing/
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})


// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
        // redirect somewhere
           res.redirect("/blogs"); 
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
})