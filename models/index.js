var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/JoinIn");
var City = require('./city');
var Blurb = require('./blurb');

module.exports.City = City;
module.exports.Blurb = Blurb;
