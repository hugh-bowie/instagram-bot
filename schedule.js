const spawn = require('child_process').spawn;
const fs = require('fs');
const schedule = require('node-schedule');
const { r, log, timeNow } = require('./src/helpers');
const firstRun = r(15, 20);
const secondRun = r(43, 48);

// schedule.scheduleJob(' 45 * * * *', () => {
// 	let now = new Date().toLocaleString();
// 	console.log(now + ' running dks.js');
// 	spawn('node', ['dks.js']);
// });

/////// OVER NIGHT /////////
// schedule.scheduleJob(' 20 20 * * *', () => {
// 	let now = new Date().toLocaleString();
// 	console.log(now + ' running dks.js');
// 	spawn('node', ['dks.js']);
// });
///// 9 
schedule.scheduleJob(' 15 21 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
//     10: PM
schedule.scheduleJob(' 19 22 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['hb.js']);
});
//       11: PM
schedule.scheduleJob(' 13 23 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
////  12: AM
schedule.scheduleJob(' 23 0 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['hb.js']);
});
////  1: AM
schedule.scheduleJob(' 33 1 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
////// 2:51 AM
schedule.scheduleJob(' 37 2 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['hb.js']);
});
//// 3:53 AM
schedule.scheduleJob(' 41 3 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
////// 4:56 AM
schedule.scheduleJob(' 30 4 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['hb.js']);
});
//// 5:59 AM
schedule.scheduleJob(' 45 5 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});