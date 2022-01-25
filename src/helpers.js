const fs = require('fs');
const r23 = r(2000, 3000);
const r15 = r(1000, 1500);


//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	// let d = date.toLocaleDateString(); // 01/03/1984	
	fs.appendFile('K:/My Drive/log.txt', `${data} @${t}\n`, () => {
		console.log(`${data} @${t}`);
	});
}

function logD(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984
	let timeNow = `${d} ${t}`;
	fs.appendFile('K:/My Drive/dks.txt', `${data} @${timeNow}\n`, () => {
		// console.log(`${data}`);
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

function logT(data) {
	let date = new Date();
	let t = date.toLocaleTimeString(); // 2:22:09 PM
	let d = date.toLocaleDateString(); // 01/03/1984
	let timeNow = `${d} ${t}`;
	fs.appendFile('K:/My Drive/twtr.txt', `${data} @${timeNow}\n`, () => {
		// console.log(`${data}`);
	});
}

//\\\\ test delay function ////\\
// setTimeout(function () {
// 	log('some shit + 2000');
// }, 2000);

// pretends this is a phone not a desktop
const device = {
	name: 'iPhone 13 Pro Max',
	userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1',
	viewport: {
		width: 428,
		height: 926,
		deviceScaleFactor: 3,
		isMobile: true,
		hasTouch: true,
		isLandscape: false,
	},
};

// Accounts not to engage
const badAccounts = ['https://www.instagram.com/hb.iv', 'https://www.instagram.com/lj_brink_'];

module.exports = { device, r, log, logD, logT, logH, badAccounts, r15, r23 }; //timeNow,timeFin,
