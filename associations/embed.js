var mongoose = require("mongoose");
// Connect to a db
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);


// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    post: [postSchema]
});
var User = mongoose.model("User", userSchema);



User.findOne({name: "Hermione Granger"}, function(err, user){
    if (err){
        console.log(err)
    } else {
        user.post.push({
            title: "3 things I really hate",
            content: "Voldemort, Voldemort, Voldemort"
        });
        user.save(function(err, user){
            if (err){
                console.log(err);
            } else {
                console.log(user)
            }
        })
    }
})



// adding new user
// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.post.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kiddin"
// })
// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(user);
//     }
// })

 
 
//  var newPost = new Post({
//      title: "Reflections on Apples",
//      content: "They are delicious"
//  });
//  newPost.save(function(err, post){
//      if(err){
//          console.log(err);
//      } else {
//          console.log(post);
//          console.log(post.__v)
//      }
//  });