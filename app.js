/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var mongojs = require('mongojs');
// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

//var seedData = [
//  {
//    first_name: 'Kevin',
//    last_name: 'Flynn',
//    email: 'kfld@gmail.com',
//    coordinates: {
//      lat: 1211,
//      long: 1231
//    }
//  },
//  {
//    first_name: 'Lol',
//    last_name: 'Baggis',
//    email: 'clola3@gmail.com',
//    coordinates: {
//      lat: 234,
//      long: 134
//    }
//  },
//  {
//    first_name: 'Joe',
//    last_name: 'Oilson',
//    email: 'jo345@yahoo.com',
//    coordinates: {
//      lat: 654,
//      long: 323
//    }
//  }
//];

var uri = 'mongodb://nali21db3:#8S7Ejefa#Pa@ds151697.mlab.com:51697/nali_db';

var db = mongojs(uri);
var users = db.collection('users');

//users.insert(seedData, function (err, result) {
//  console.log(err);
//  console.log(result);
//});
var userArray = [];
var finalUserArray = [];
users.find(function (err, result) {
  result.forEach(function(user){
    userArray.push(user);
    if (userArray.length == result.length) {
      finalUserArray = userArray;
      console.log(finalUserArray);
    }
  });
});

//app.post('/addUser', function (request, response) {
//  var user = {
//    "first_name": request.first_name,
//    "last_name": request.last_name
//  };
//
//  users.insert(seedData, function (err, result) {
//    if (err) {
//      response.send(JSON.stringify({ error: 'error!' }));
//      console.log(err);
//      console.log('Wooooo error');
//    } else {
//      response.send(JSON.stringify({ status: 'success!' }));
//      console.log("Wooooo no error");
//      console.log(result);
//    }
//  });
//});

// start server on the specified port and binding host
//app.listen(3000, '0.0.0.0', function() {
//  // print a message when the server starts listening
//  console.log("server starting on localhost:3000");
//});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
