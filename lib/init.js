var preferencesDir = `${process.env['HOME']}/.0n/preferences.json`;
var preferences = require(preferencesDir);
var async = require('async');
var inquirer = require('inquirer');
var colors = require('colors');
var jsonfile = require('jsonfile')

var questions = [{
	type: 'input',
	name: 'username',
	message: 'what is your gmail username!',
	validate: function (value) {
    value = value.trim();
    if (value.length > 0) {
      return true;
    }
    return 'please enter username.';
  }
},
{
	type: 'password',
	name: 'password',
	message: 'what is your gmail password ?',
	validate: function (value) {
    value = value.trim();
    if (value.length > 0) {
      return true;
    }
    return 'please enter a password.';
  }
},
{
	type: 'input',
	name: 'to',
	message: 'which mail adress you want to recieve mails ?',
	validate: function (value) {
    value = value.trim();
    if (value.length > 0) {
      return true;
    }
    return 'please enter a mail.';
  }
},
{
	type: 'input',
	name: 'from',
	message: 'which mail adress you want to send mails ?',
	validate: function (value) {
    value = value.trim();
    if (value.length > 0) {
      return true;
    }
    return 'please enter a mail.';
  }
}
];
// TODO MAIL CHECK. @cagataycali
module.exports = function () {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then(function (answers) {
      preferences.mail = answers;
      jsonfile.writeFile(preferencesDir, preferences, function (err) {
        if (err) {
          reject(colors.red(err))
        } else {
          resolve(colors.bold.green('good job!'))
        }
      })
		});
	});
}
