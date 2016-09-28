var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlurbSchema = new Schema({
  poster: String,
  textContent: String,
  likes: Number,
  imgPath: String
});

var Blurb = mongoose.model('Blurb', BlurbSchema);

module.exports = Blurb;
