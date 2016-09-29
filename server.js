// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
var morgan = require('morgan');

// generate a new express app and call it 'app'
var app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('combined'));

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */
app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/cities/:id', function homepage(req, res) {
    console.log(req.params.id)
    res.sendFile(__dirname + '/views/cities.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api/cities', function api_index(req, res) {
    // send all cities as JSON response
    db.City.find({}, function(err, city) {
        if (err) {
            return console.log("index error " + err);
        }
        res.json(city);
    });
});

app.post('/api/cities', function citiesCreate(req, res) {
    var newCity = new db.City({
        location: {
            lat: req.body.lat,
            lng: req.body.lng
        },
        name: req.body.name,
        logo: req.body.logo,
        blurbs: req.body.blurbs
    });
});

app.get('/api/cities/:id', function citiesShow(req, res) {
    db.City.findOne({
        _id: req.params.id
    }, function(err, city) {
        res.json(city);
    })
});

app.delete('/api/cities/:id', function cityDestroy(req, res) {
    cityId = req.params.id;
    db.City.remove({
        _id: cityId
    }, function(err, removedCity) {
        if (err) {
            res.send("error")
        };
        res.json({
            _id: cityId
        });
    });
});

app.get('/api/cities/:id/blurbs', function blurbsShow(req, res) {
    db.City.findOne({
        _id: req.params.id
    }, function(err, city) {
        res.json(city.blurbs);
    })
});

app.post('/api/cities/:id/blurbs', function blurbsCreate(req, res) {
    var newBlurb = new db.Blurb({
        poster: req.body.poster,
        textContent: req.body.textContent,
        likes: 0,
        imgPath: req.body.imgPath
    });
    newBlurb.save();
    res.json(newBlurb);
});

app.delete('/api/cities/:id/blurbs/:blurbId', function deleteBlurb(req, res) {
    var blurbId = req.params.blurbId;
    var cityId = req.params.id;

    db.City.findOne({
        _id: cityId
    }, function(err, city) {
        city.blurbs = city.blurbs.filter(function(blurb) {
            return blurb._id != blurbId;
        })
        city.save();
    });
    res.send(blurbId);

});



app.put('/api/cities/:id/blurbs/:blurbId', function updateBlurb(req, res) {
    var blurbId = req.params.blurbId;
    var cityId = req.params.id;

    db.City.findOne({
            _id: cityId
        },
        function(err, city) {
          city.blurbs.forEach(function(blurb) {
                if (blurb._id == blurbId) {
                    blurb.likes += 1;
                }
            });
            city.save();
        });

    res.send(blurbId);
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running on http://localhost:3000/');
});
