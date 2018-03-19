var repoOwner = process.argv[2];
var repoName = process.argv[3];

var request = require('request');
var fs = require('fs');
require('dotenv').config();

var password = process.env.Authenticator;

var starredObj = getStarredURLs(repoOwner, repoName, function(err, result) {
  arrayOfObj = JSON.parse(result);
  var URLs = [];
  var output = {};
  for (var i = 0; i <arrayOfObj.length; i++) {
    URLs[i] = arrayOfObj[i].starred_url;
    output[arrayOfObj[i].login] = URLs[i].substring(0,URLs[i].length - 15);
  }
  console.log(output);
  //getstarredreposlist(output, function(err2, result2) {
    // console.log(result2);
    // parsedResult = JSON.parse(result2);
    // console.log(parsedResult.length);
    console.log('hello world');
  //});
});

function getStarredURLs(repoOwner, repoName, cb) {
 var options = {
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization':password
    }
  };
  request(options, function(err, res, body) {
    if (err !== 401 && err !== 403){
      cb(err, body);
    } else {
      console.log ('repo doesnt exist or authetication failed');
    }
  });
}

function getstarredreposlist(info, callback) {
  for (var user in info) {
    var options = {
      url: info[user],
      headers: {
        'User-Agent': 'request',
        'Authorization':password
        }
    };
    console.log("this is the url: " +  options.url);
    request(options, function(err, res, body) {
      callback(err, body);
    });
  }
}

// starred_url:
// https://api.github.com/users/MikaAK/starred{/owner}{/repo}