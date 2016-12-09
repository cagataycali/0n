var configDir = `${process.env['HOME']}/.0n/preferences.json`;
var config = require(configDir);
var colors = require('colors');

module.exports = function () {
  if (config.key.length === 0) {
    console.log(colors.bold.blue('Nothing to see here, you can add your first site!'));
  } else {
    console.log(colors.bold.green(`Your telegram key is : ${config.key}`));
  }
}
