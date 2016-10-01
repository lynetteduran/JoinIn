var db = require("./models");

//use JoinIn
//db.dropDatabase();

var SanFrancisco = {
    location: {
        lat: 1,
        lng: 1
    },
    name: "SAN FRANCISCO",
    logo: "https://parkerhiggins.net/wp-content/uploads/2012/07/ggb.png", //url to image

    blurbs: [{
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
        textContent: "Theo, drop it!",
        likes: 1,
        imgPath: ""
    }]
}

var NewYorkCity = {
    location: {
        lat: 1,
        lng: 1
    },
    name: "NEW YORK CITY",
    logo: "http://webpage.pace.edu/sd93883p/CIS%20Group%20Project/skyline.gif", //url to image

    blurbs: [{
        poster: "Claire",
        textContent: "Bananas overtake world",
        likes: 10,
        imgPath: ""
    }, {
        poster: "Nathan",
        textContent: "Is that a !@$% 4 space tab?!",
        likes: 1,
        imgPath: ""
    }, {
        poster: "Theo",
        textContent: "Bark.",
        likes: 10000,
        imgPath: ""
    }]
}

var Seattle = {
    location: {
        lat: 1,
        lng: 1
    },
    name: "SEATTLE",
    logo: "http://i.imgur.com/VPljh4J.png", //url to image

    blurbs: [{
        poster: "Toby",
        textContent: "Seattle's best coffee is my favorite",
        likes: 9,
        imgPath: ""
    }, {
        poster: "Teddy",
        textContent: "I could use a Noah's Bagel right about now",
        likes: 55,
        imgPath: ""
    }, {
        poster: "Lily",
        textContent: "I'm blue bob a deeb ah buh bye.",
        likes: 10,
        imgPath: ""
    }]
}

db.City.create(SanFrancisco, function(err, city){
  if(err){
    return console.log("Error!", err);
  }
  console.log("new city", city)
});

db.City.create(NewYorkCity, function(err, city){
  if(err){
    return console.log("Error!", err);
  }
  console.log("new city", city)
});

db.City.create(Seattle, function(err, city){
  if(err){
    return console.log("Error!", err);
  }
  console.log("new city", city)
});
