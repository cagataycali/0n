#!/usr/bin/env node
const async = require('async');
const E = require('3x3c');
const inquirer = require('inquirer');
var globalModulesDir = require('global-modules');
var updateNotifier = require('update-notifier');
var pkg = require('./package.json');

function q() {
  var questions = [
    {
      type: 'list',
      name: 'option',
      message: 'How can I help you,',
      choices: ['List', 'Add', 'Remove','Telegram', 'Run worker!', 'Stop worker!'],
    }
  ];

  inquirer.prompt(questions).then(function (answers) {

     if (answers.option === 'List') {
       require('./lib/list')();
     } else if (answers.option === 'Add') {
       require('./lib/add')().then(value => {console.log(value);}).catch((err) => {console.log(err);})
     } else if (answers.option === 'Remove') {
       require('./lib/remove')().then((value) => {console.log(value);}).catch((err) => {console.log(err);})
     } else if (answers.option === 'Telegram') {
       require('./lib/telegram')();
     } else if (answers.option === 'Run worker!') {
       require('./lib/worker').run();
     } else if (answers.option == 'Stop worker!') {
       require('./lib/worker').stop();
     }
  });
}

// Check init
function c() {
  return new Promise(function(resolve, reject) {
    try {
      var preferences = require(`${process.env['HOME']}/.0n/preferences.json`).mail;
      if (preferences.username.length === 0 || preferences.password.length === 0 || preferences.to.length === 0 || preferences.from.length === 0) {
        resolve(true);
      }
    } catch (e) {
      resolve(true);
    }
    reject(false);
  });
}

E(`${globalModulesDir}/0n/run.sh`)
  .then((value) => {
    c()
      .then((init) => {
        require('./lib/init')().then((value) => {console.log(value);}).catch((err) => {console.log(err);})
      })
      .catch((init) => {
        q();
      })
  })
  .catch((err) => {console.log(err);})
