var pm2 = require('pm2');
var async = require('async');
var globalModulesDir = require('global-modules');
module.exports.run = function () {
  pm2.connect(function(err) {
    if (err) {
      console.log(err);
      process.exit(2);
    }

    pm2.start({
      name: '0n',
      script    : `${globalModulesDir}/0n/cron.js`,
      exec_mode : 'fork',
      max_memory_restart : '100M'
    }, function(err, apps) {
      pm2.disconnect();
      if (err) console.log(err);
    });
  });
}

function sleep(s) {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      resolve('Done');
    }, s * 1000);
  });
}

module.exports.stop = function () {
  var pm2 = require('pm2');
  pm2.delete('0n', function(err) {})
  pm2.disconnect();
  sleep(2)
   .then((value) => {
     console.log('Bye bye..');
     process.exit();
   })
}
