const fs = require('fs');
const r23 = r(2000, 3000);
const r15 = r(1000, 1500);
let date = new Date();
let t = date.toLocaleTimeString(); // 2:22:09 PM
let d = date.toLocaleDateString(); // 01/03/1984
let timeNow = `${d}@${t}`;

//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min) + min);
}

//Function that logs timeStamp + data + \n
function log(data, path) {
	fs.appendFile(`${path}`, `${data}\n`, () => {
		console.log(`${data}`);
	});
}

// pretends this is a phone not a desktop
const device = {
	name: 'iPhone 11',
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
	viewport: {
		width: 414,
		height: 828,
		deviceScaleFactor: 2,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

// Accounts not to engage
const badAccounts = ['https://www.instagram.com/hb.iv', 'https://www.instagram.com/lj_brink_'];

module.exports = { device, timeNow, r, log, badAccounts, r15, r23 };
