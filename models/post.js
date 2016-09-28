var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  poster: String,
  textContent: String,
  likes: Number,
  imgPath: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
