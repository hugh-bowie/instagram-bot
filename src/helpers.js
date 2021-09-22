const fs = require('fs');

let date = new Date();
let t = date.toLocaleTimeString(); // 2:22:09 PM
let d = date.toLocaleDateString(); // 01/03/1984
let timeNow = `${d} ${t}`;

const badAccounts = ['https://www.instagram.com/hb.iv', 'https://www.instagram.com/lj_brink_'];

//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min + 1) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {
	fs.appendFile('src/log.txt', ` ${data}\n`, () => {
		console.log(`${data}`);
	});
}

// pretends this is a phone not a desktop
const device = {
	name: 'iPhone 12 Pro Max',
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
	viewport: {
		width: 426,
		height: 926,
		deviceScaleFactor: 3,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

module.exports = { device, timeNow, r, log, badAccounts };

// let currenturl = 'https://www.instagram.com/hb.iv';
// let searchResult = badAccounts.includes(currenturl);
// if (!searchResult) {
// 	console.log('no bad accoutns found ' + searchResult);
// } else {
// 	console.log('badAccounts found ' + searchResult);
// }
