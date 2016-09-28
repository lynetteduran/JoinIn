var db = require("./models");

var SanFrancisco = {
    location: {
        lat: 1,
        lng: 1
    },
    name: "San Francisco",
    logo: "https://parkerhiggins.net/wp-content/uploads/2012/07/ggb.png", //url to image

    posts: [{
        poster: "Brandon",
        textContent: "Hey I made a post",
        likes: 100,
        imgPath: ""
    }, {
        poster: "Lynette",
        textContent: "I'm gonna bake you a cookie",
        likes: 101,
        imgPath: ""
    }, {
        poster: "Ilias",
        textContent: "Theo drop it!",
        likes: 1,
        imgPath: ""
    }]
}

db.City.create(SanFrancisco, function(err, city){
  if(err){
    return console.log("Error!", err);
  }
  console.log("new city", city)
});
