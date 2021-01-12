const spawn = require('child_process').spawn;
const schedule = require('node-schedule');

schedule.scheduleJob('*/35 * * * *', () => {
	console.log('running ig.js every 35 min');
	spawn('node', ['ig.js']);
});
