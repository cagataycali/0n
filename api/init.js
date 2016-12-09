var request = require('request');
var preferencesDir = `${process.env['HOME']}/.0n/preferences.json`;
var preferences = require(preferencesDir);
var jsonfile = require('jsonfile');
var async = require('async');
var colors = require('colors');

// Get your first key
module.exports.init = function () {
  request('https://l00g.herokuapp.com/get', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      preferences.key = JSON.parse(body).key;
      jsonfile.writeFile(preferencesDir, preferences, function (err) {
        if (err) {
          console.log(colors.red(err))
        }
      })
    } else {
      console.log(error);
    }
  });
}

module.exports.getKey = function () {
  return preferences.key;
}

module.exports.notify = function(name, url) {
  request.post('https://l00g.herokuapp.com/key', {form:{key:preferences.key,name:name,url:url}})
  console.log(name,url,preferences.key);
  return 'Done!';
}
