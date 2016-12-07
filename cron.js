const isReachable = require('is-reachable');
var async = require('async');
var notify = require('./lib/notify');
var CronJob = require('cron').CronJob;
// if is online :)
new CronJob('* * * *', function() {
  console.log('Cronjob triggered');
  var configDir = `${process.env['HOME']}/.0n/config.json`;
  var config = require(configDir);

  async.every(config, function(site, callback) {
    isReachable(site.url).then(reachable => {
        if (!reachable) {
          console.log(`${site.name}, is unreachable.`);
          notify({
            notify: {
              'title': `${site.name} | 0n`,
              'message': `${site.url}, is unreachable.`
            },
            site: site,
          });
          callback(site, 'err');
        } else {
          console.log(`${site.name}, your cool site is working.. :) `);
          callback(null, 'done')
        }
    })
  }, function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log('work work work work work..');
  });


}, null, true, 'America/Los_Angeles');
