const spawn = require('child_process').spawn;
const schedule = require('node-schedule');

schedule.scheduleJob('22,43 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + 'running ig.js every hour at 27 and 49 ');
	spawn('node', ['test.js']);
});
