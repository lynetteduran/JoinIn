var db = require('./models');

var cityId = "57ec8e8acf09e7423d8aa28d";
var blurbId = "57ec8e8acf09e7423d8aa290";

db.City.findOne({_id: cityId}, function(err, city) {
  console.log("BEFORE", city.blurbs);
  city.blurbs = city.blurbs.filter(function(blurb) {
    return blurb._id != blurbId;
  })
  city.save();
})
