var configDir = `${process.env['HOME']}/.0n/config.json`;
var config = require(configDir);
var async = require('async');
var inquirer = require('inquirer');
var colors = require('colors');
var jsonfile = require('jsonfile')

function findAndDelete(name) {
	config.forEach((value, key) => {
		if (value.name === name) {
			delete config[key];
		}
	})
	config = config.filter(n => true)
	return config;
}

var questions = [
	{
		type: 'list',
		name: 'option',
		message: 'Which site will be deleted?',
		choices: config
	}
];
module.exports = function () {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then(function (answers) {
      jsonfile.writeFile(configDir, findAndDelete(answers.option), function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(colors.bold.green(`${answers.option} was deleted successfully.`))
        }
      })
		});
	});
}
