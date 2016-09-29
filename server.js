// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/cities', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api/cities', function citiesIndex(req, res){
  // send all cities as JSON response
  db.City.find(function(err, city) {
    if (err) {
      return console.log("index error " + err);
    }
    res.json(city);
  });
});

app.post('/api/cities', function citiesIndex(req, res) {
  //create a new City
});

app.get('/api/cities/:id', function citiesIndex(req, res) {
  //get all cities
});

app.delete('/api/cities/:id', function cityDelete(req, res) {
  //delete a city
});

app.get('/api/cities/:id/blurbs', function blurbShow(req, res) {
  //get all blurbs for a city
});

app.post('/api/cities/:id/blurbs', function blurbCreate(req, res) {
  //add a blurb for a city
});

app.put('/api/cities/:id/blurbs/:blurbId', function blurbUpdate(req, res) {
  //update a blurb
});

app.delete('/api/cities/:id/blurbs/:blurbId', function blurbDelete(req, res) {
  //delete a blurb
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
