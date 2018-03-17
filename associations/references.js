var mongoose = require("mongoose");
// Connect to a db
mongoose.connect("mongodb://localhost/blog_demo_2");

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
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
            
        }
    ]
});
var User = mongoose.model("User", userSchema);

// Post.create({
//     title: "How to cook the best burger part 3",
//     content: "ajshdoihwadoiashduashdashdidaiudasu"
// }, function(err, post){
//     if (err){
//         console.log(err)
//     }
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//         if(err){
//             console.log(err)
//         } else {
//             foundUser.post.push(post);
//             foundUser.save(function(err, data){
//                 if (err){
//                     console.log(err);
//                 } else {
//                     console.log(data)
//                 }
//             })
//         }
//     })
// })

// Find User
// Find all posts for that user

User.findOne({email: "bob@gmail.com"}).populate("post").exec(function(err, user){
    if(err){
        console.log(err)
    } else {
        console.log(user)
    }
})



// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

