var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Blurb = require('./blurb');

var CitySchema = new Schema({
    location: {
        lat: Number,
        lng: Number
    },
    name: String,
    logo: String, //url to image
    blurbs: [Blurb.schema]
});

var City = mongoose.model('City', CitySchema);

module.exports = City;
