var configDir = `${process.env['HOME']}/.0n/config.json`;
var config = require(configDir);
var async = require('async');
var inquirer = require('inquirer');
var colors = require('colors');
var validUrl = require('valid-url');
var jsonfile = require('jsonfile')

function findSite(name) {
  var bool = false;
	config.forEach((value, key) => {
		if (value.name === name) {
			bool = true;
		}
	})
	return bool;
}

function findUrl(url) {
  var bool = false;
	config.forEach((value, key) => {
		if (value.url === url) {
			bool = true;
		}
	})
	return bool;
}

var questions = [{
	type: 'input',
	name: 'name',
	message: 'what is your site name!',
	validate: function (value) {
    value = value.trim();
    if (value.length > 0 && !findSite(value)) {
      return true;
    }
    return 'please enter unused name.';
  }
},
{
	type: 'input',
	name: 'url',
	message: 'what is the url ?',
	validate: function (value) {

    value = value.trim();
    if (validUrl.isUri(value) && !findUrl(value)) {
      return true;
    }
    return 'please enter correct or unused url.';
  }
}];
module.exports = function () {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then(function (answers) {
      config.push(answers);
      jsonfile.writeFile(configDir, config, function (err) {
        if (err) {
          reject(colors.red(err))
        } else {
          resolve(colors.bold.green('good job!'))
        }
      })
		});
	});
}
