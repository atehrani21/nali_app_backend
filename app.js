/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var HTTP_STATUS = require('http-status');
// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

var uri = 'mongodb://nali21db3:#8S7Ejefa#Pa@ds151697.mlab.com:51697/nali_db';

var db = mongojs(uri);
var users = db.collection('users');

//users.insert(seedData, function (err, result) {
//  console.log(err);
//  console.log(result);
//});

//users.find(function (err, result) {
//  result.forEach(function(user){
//    console.log(result);
//  });
//});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addUser', function (request, response) {
  console.log(request);
  var user = {
    "user_name": request.body.user_name,
    "first_name": request.body.first_name,
    "last_name": request.body.last_name
  };

  users.insert(user, function (err, result) {
    if (err) {
      response.status(HTTP_STATUS.FORBIDDEN).json(error.error);
      console.log(err);
      console.log('Wooooo error');
    } else {
      response.json({ status: 'success!', result: result });
      console.log("Wooooo no error");
      console.log(result);
    }
  });
});

app.post('/updatePosition', function (request, response) {
  console.log(request);
  var id = request.body.id;
  var position = {
    "x": request.body.x,
    "y": request.body.y
  };

  users.update({"_id.$oid": id}, {$set: {position: position}}, function (err, result) {
    if (err) {
      response.status(HTTP_STATUS.FORBIDDEN).json(error.error);
      console.log(err);
      console.log('Wooooo error');
    } else {
      response.json({ status: 'success!', result: result });
      console.log("Wooooo no error");
      console.log(result);
    }
  });
});

// start server on the specified port and binding host
//app.listen(3000, '0.0.0.0', function() {
//  // print a message when the server starts listening
//  console.log("server starting on localhost:3000");
//});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
