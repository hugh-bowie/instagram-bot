const spawn = require('child_process').spawn;
const schedule = require('node-schedule');

schedule.scheduleJob('13,43 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log('running ig.js every hour at :13 and :43 ' + now);
	spawn('node', ['ig.js']);
});
