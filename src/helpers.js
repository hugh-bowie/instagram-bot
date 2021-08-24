const fs = require('fs');

//For Saving screenshots   returns this         8-18-21 5.55.08 PM
const timeStamp = new Date().toLocaleString().replace('2021', '21').replace(/\//g, '-').replace(/:/g, '.').replace(',', '').trim();

//setTimeout(() => { console.log(timeStamp + otherT); }, 5000);

//random number function
function r(min, max) {
	return ~~(Math.random() * (max - min + 1) + min);
}

//Function that logs timeStamp + data + \n
function log(data) {
	fs.appendFile('src/log.txt', `${timeStamp}  ${data}\n`, () => { });
	console.log(` ${timeStamp} ${data}`);
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


module.exports = { device, timeStamp, r, fs, log };

////// TODO: EXPORT THIS AS AN ASYNC FUNCTION
// for (let xxx = 0; xxx < badAccounts.length; xxx++) {
// 	if (currentURL.indexOf(badAccounts[xxx]) === -1) {
// 		console.log(` ❌ DID NOT MATCH the current url: ${currentURL} did not match ${badAccounts[xxx]} \n`);
// 	} else if (currentURL.indexOf(badAccounts[xxx]) >= 0) {
// 		console.log(` ✔️ DID MATCH the current url ${currentURL} did match ${badAccounts[xxx]} of the baddies \n`);
// 	}
// }
