const { r } = require('./helpers');
const fs = require('fs');

function logH(data) {
	fs.appendFile('K:/My Drive/hb.txt', `${data}\n`, () => {
		console.log(`${data}`);
	});
}

const hbAccounts = [
	// Pages mostly women Visit
	'https://www.instagram.com/boandtee/',
	'https://www.instagram.com/shoesbyohpolly/',
	'https://www.instagram.com/revolve/',
	'https://www.instagram.com/revolvebeauty/',
	'https://www.instagram.com/ohpolly/',
	'https://www.instagram.com/seduction_la/',
	'https://www.instagram.com/ohmboutique/',
	'https://www.instagram.com/sahirajewelrydesign/',
	'https://www.instagram.com/cottononbody/',
	'https://www.instagram.com/bangn.body/',
	'https://www.instagram.com/lovetrends.shop/',
];

module.exports = { hbAccounts, logH };
