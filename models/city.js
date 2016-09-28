var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = require('./post');

var CitySchema = new Schema({
    location: {
        lat: Number,
        lng: Number
    },
    name: String,
    logo: String, //url to image
    posts: [Post.schema]
});

var City = mongoose.model('City', CitySchema);

module.exports = City;
