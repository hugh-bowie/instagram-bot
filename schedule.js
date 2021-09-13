const spawn = require('child_process').spawn;
const schedule = require('node-schedule');

schedule.scheduleJob('27,49 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log('running ig.js every hour at 27 and 49 ' + now);
	spawn('node', ['test.js']);
});
