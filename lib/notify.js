const notifier = require('node-notifier');
const mail = require('./mail');
const telegram = require('../api/init');
var preferencesDir = `${process.env['HOME']}/.0n/preferences.json`;
var preferences = require(preferencesDir).mail;

module.exports = function(obj) {
  notifier.notify(obj.notify);
  var mailConfig = {
    username: preferences.username,
    password: preferences.password,
    to: preferences.to,
    from: preferences.from,
    text: 'Hello, your site gone down ✔',
    site: obj.site
  }
  telegram.notify(obj.site.name, obj.site.url);
  mail(mailConfig);
};
