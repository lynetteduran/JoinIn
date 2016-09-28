var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/JoinIn");
var City = require('./city');
var Post = require('./post');

module.exports.City = City;
module.exports.Post = Post;
