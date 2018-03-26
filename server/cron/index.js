var CronJob = require('cron').CronJob;
const { checkNotif, sendNotif } = require('./notification')


new CronJob('2 * * * * *', function() {
  checkNotif(sendNotif)
}, null, true, 'Asia/Jakarta');
