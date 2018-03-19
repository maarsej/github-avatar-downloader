var repoOwner = process.argv[2];
var repoName = process.argv[3];

var request = require('request');
var fs = require('fs');
require('dotenv').config();


var password = process.env.Authenticator;

console.log('Welcome to the GitHub Avatar Downloader!');

// Function call
var dlPath = "avatars/";

if (!fs.existsSync(dlPath)) {
    console.log("Expected avatars folder does not exist");
    return;
}
else if (process.argv.length !== 4) {
  console.log('repoOwner and repoName must be specified and the only arguements given');
}
else if (password === undefined) {
  console.log('.env file is either missing information or does not exist');
}
else if (repoOwner && repoName) {
  getRepoContributors(repoOwner, repoName, function(err, result) {
    arrayOfObj = JSON.parse(result);
    for (var i = 0; i <arrayOfObj.length; i++) {
      //console.log(arrayOfObj);
      downloadImageByURL(arrayOfObj[i].avatar_url, `avatars/${arrayOfObj[i].login}.jpg`);
      console.log('Download:', i+1," of ", arrayOfObj.length, " complete.");
    }
  });
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
