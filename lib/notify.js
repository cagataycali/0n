const notifier = require('node-notifier');
const mail = require('./mail');
var preferencesDir = `${process.env['HOME']}/.0n/preferences.json`;
var preferences = require(preferencesDir).mail;
var native = require(preferencesDir).native;
module.exports = function(obj) {
  if (native) {
    notifier.notify(obj.notify);
  }
  var mailConfig = {
    username: preferences.username,
    password: preferences.password,
    to: preferences.to,
    from: preferences.from,
    text: 'Hello, your site gone down ✔',
    site: obj.site
  }
  mail(mailConfig);
};
