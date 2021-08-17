const spawn = require('child_process').spawn;
const schedule = require('node-schedule');

schedule.scheduleJob('22,55 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log('running ig.js every hour at :22 and :55 ' + now);
	spawn('node', ['ig.js']);
});
