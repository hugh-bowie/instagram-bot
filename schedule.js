const spawn = require('child_process').spawn;
const schedule = require('node-schedule');

schedule.scheduleJob('23,44 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log('running ig.js every hour at 35 and :55 ' + now);
	spawn('node', ['ig.js']);
});
