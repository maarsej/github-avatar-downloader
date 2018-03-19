var repoOwner = process.argv[2];
var repoName = process.argv[3];

var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

// Function call

if (repoOwner && repoName) {
  getRepoContributors(repoOwner, repoName, function(err, result) {
    arrayOfObj = JSON.parse(result);
    for (var i = 0; i <arrayOfObj.length; i++) {
      downloadImageByURL(arrayOfObj[i].avatar_url, `avatars/${arrayOfObj[i].login}.jpg`);
      console.log('Download:', i+1," of ", arrayOfObj.length, " complete.");
    }
  });
}
else {
  console.log('repoOwner and repoName must be specified');
}

// FUNCTIONS

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

function getRepoContributors(repoOwner, repoName, cb) {
 var options = {
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization': secrets.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}
