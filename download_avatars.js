var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');


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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);
  arrayOfObj = JSON.parse(result);
  console.log(arrayOfObj.length);
  //console.log(arrayOfObj[1].avatar_url);
  for (var i = 0; i <arrayOfObj.length; i++) {
    downloadImageByURL(arrayOfObj[i].avatar_url, `avatars/${arrayOfObj[i].login}.jpg`);
    console.log('Download:', i+1," of ", arrayOfObj.length, " complete.");
  };
});

function downloadImageByURL(url, filePath) {
request.get(url)
       .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

// request.get(arrayOfObj[i].avatar_url)
//        .pipe(fs.createWriteStream(`./avatars/${arrayOfObj[i].login}.jpg`));

