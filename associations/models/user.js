var mongoose = require("mongoose");

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
module.exports = User;
