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
  var user = {
    "user_name": request.body.user_name,
    "first_name": request.body.first_name,
    "last_name": request.body.last_name
  };

  users.find({"user_name": user.user_name}, function (err, result) {
    if (result[0]) {
      response.json({"error": "username already exists! please try another username."});
    } else {
      users.insert(user, function (err, result) {
        if (err) {
          response.status(HTTP_STATUS.FORBIDDEN).json({error: err});
          //console.log(err);
        } else {
          response.json({ status: 'success!', result: result });
          //console.log(result);
        }
      });
    }
  });
});

app.post('/updatePosition', function (request, response) {
  var userName = request.body.user_name;
  var position = {
    "x": request.body.x,
    "y": request.body.y
  };

  users.update({"user_name": userName}, {$set: {position: position}}, function (err, result) {
    if (err) {
      response.status(HTTP_STATUS.FORBIDDEN).json({error: err});
      //console.log(err);
    } else {
      response.json({ status: 'success!', result: result });
      //console.log(result);
    }
  });
});

//Checking if friend exists
app.post('/checkFriendRequest', function (request, response) {
  var friendRequest = request.body.user_name;
  users.find({user_name: friendRequest}, function (err, result) {
    if(err){
      response.status(HTTP_STATUS.FORBIDDEN).json({error: err});
      //console.log(err);
      //console.log("Error");
    } else {
      if (result[0]) {
        console.log(result);
        response.json({status: 'Successfully added friend', user_exists: true});
      } else {
        response.json({status: "User doesn't exist", user_exists: false});
      }
    }
  });
});

//Take in requested username from app. Returns the last known request of friend
app.post('/requestFriend', function (request, response) {
  //Username
  console.log(request);
  var friendname = request.body.user_name;
  //Compare the request with what's in databse
  users.find({user_name: friendname}, function (err, result) {
    if (result[0]) {
      //console.log(result);
      //Requests position Set up json
      if(result[0].position) {
        var position = {"x": result[0].position.x, "y": result[0].position.y};
        response.json({ status: 'success!', result: position});
      } else {
        response.json({status: 'error', result: 'user does not have any coordinates'});
        //console.log("Error user doesn't have coordinates!");
      }
    } else {
      response.status(HTTP_STATUS.FORBIDDEN).json({error: err});
      //console.log(err);
      //console.log("Error user doesn't exist");
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
