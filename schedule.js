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
// schedule.scheduleJob(' 31 21 * * *', () => {
// 	let now = new Date().toLocaleString();
// 	console.log(now + ' running dks.js');
// 	spawn('node', ['dks.js']);
// });
//     10: PM
schedule.scheduleJob(' 05 22 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
//       11: PM
schedule.scheduleJob(' 35 23 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
// //     12: AM
// schedule.scheduleJob(' 42 0 * * *', () => {
// 	let now = new Date().toLocaleString();
// 	console.log(now + ' running dks.js');
// 	spawn('node', ['dks.js']);
// });
//      1: AM
schedule.scheduleJob(' 55 1 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
// ////// 2:51 AM
// schedule.scheduleJob(' 51 2 * * *', () => {
// 	let now = new Date().toLocaleString();
// 	console.log(now + ' running dks.js');
// 	spawn('node', ['dks.js']);
// });
////// 3:53 AM
schedule.scheduleJob(' 27 3 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});
// ////// 4:56 AM
// schedule.scheduleJob(' 56 4 * * *', () => {
// 	let now = new Date().toLocaleString();
// 	console.log(now + ' running dks.js');
// 	spawn('node', ['dks.js']);
// });
////// 5:59 AM
schedule.scheduleJob(' 36 5 * * *', () => {
	let now = new Date().toLocaleString();
	console.log(now + ' running dks.js');
	spawn('node', ['dks.js']);
});