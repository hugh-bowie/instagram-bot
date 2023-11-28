const fs = require('fs');
const r23 = r(1500, 3000);
const r15 = r(1000, 1500);


//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984	
	fs.appendFile('K:/My Drive/log.txt', `${data} Date: ${d}@${t}\n`, () => {
		console.log(`${data} @${t}`);
	});
}

function logD(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984
	let timeNow = `${d} ${t}`;
	fs.appendFile('K:/My Drive/dks.txt', `${data} @${timeNow}\n`, () => {
		console.log(`${data}`);
	});
}

function logH(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984
	let timeNow = `${d} ${t}`;
	fs.appendFile('K:/My Drive/hb.txt', `${data} @${timeNow}\n`, () => {
		// console.log(`${data}`);
	});
}


// pretends this is a phone not a desktop
const device = {
	name: 'iPhone 13 Pro Max',
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/290.1.581873948 Mobile/21B91 Safari/604.1',
	viewport: {
		width: 428,
		height: 926,
		deviceScaleFactor: 3,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

const desktop = {
	name: 'HP 24ec',
	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
	viewport: {
		width: 1920,
		height: 1080,
	},
};

const hCookie = {
	name: 'ltk-onsite-content-session-email-click',
	value: 'true',
	domain: '.the-house.com',
	url: 'https://.the-house.com/',
	path: '/',
	httpOnly: false,
	secure: false,
}

// Accounts not to engage
const badAccounts = ['https://www.instagram.com/hb.iv', 'https://www.instagram.com/lj_brink_'];


const win = {
	h: 900,
	w: 516,
	x: 5,
	y: 5,
}

module.exports = { device, r, log, logD, logH, badAccounts, r15, r23, hCookie, desktop, win }; //timeNow,timeFin,
