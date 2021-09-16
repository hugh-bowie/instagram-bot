const spawn = require('child_process').spawn;
const schedule = require('node-schedule');
const { r } = require('./src/helpers');
const firstRun = r(15, 20);
const secondRun = r(43, 48);
schedule.scheduleJob(' 23,46 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + 'running ig.js every hour at 27 and 49 ');
	spawn('node', ['test.js']);
});
