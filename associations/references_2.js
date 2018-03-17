var mongoose = require("mongoose");
// Connect to a db
mongoose.connect("mongodb://localhost/blog_demo_3");
var Post = require("./models/post"); // ./ for current directories
var User = require("./models/user"); 




