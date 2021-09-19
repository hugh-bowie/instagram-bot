const spawn = require('child_process').spawn;
const fs = require('fs');
const schedule = require('node-schedule');
const { r, log, timeNow } = require('./src/helpers');
const firstRun = r(15, 20);
const secondRun = r(43, 48);
schedule.scheduleJob(' 11,46 * * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running ig.js every hour at 15 and 36 ');
	spawn('node', ['test.js']);
});
