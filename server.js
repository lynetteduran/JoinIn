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
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api/cities', function api_index (req, res){
  // send all cities as JSON response
      db.City.find(function(err, city) {
          if (err) {
              return console.log("index error " + err);
          }
          res.json(city);
      });
});

app.post('/cities', function songsCreate(req, res) {

});

app.get('/cities/:id', function albumsIndex(req, res) {

});

app.delete('/cities/:id', function albumCreate(req, res) {

});

app.get('/cities/:id/blurbs', function albumShow(req, res) {
});

app.post('/cities/:id/blurbs', function albumShow(req, res) {
});

app.delete('/cities/:id/blurbs/:blurbId', function deleteAlbum(req, res) {
});

app.put('/cities/:id/blurbs/:blurbId', function updateAlbum(req, res) {
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
