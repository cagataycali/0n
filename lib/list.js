var configDir = `${process.env['HOME']}/.0n/config.json`;
var config = require(configDir);
var colors = require('colors');

module.exports = function () {
  if (config.length === 0) {
    console.log(colors.bold.blue('Nothing to see here, you can add your first site!'));
  }
	config.forEach((value, key) => {
    console.log(colors.magenta(value.name), colors.grey('=>') ,colors.blue(value.url));
  })
}
