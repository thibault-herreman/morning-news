const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title : String,
    description : String,
    urlToImage : String,
    language: String,
});

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    wishlist: [ArticleSchema],
    language: String
});

const userModel = mongoose.model('users', userSchema)

module.exports = userModel