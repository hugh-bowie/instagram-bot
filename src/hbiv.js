const { r } = require('./helpers');
const fs = require('fs');

function logH(data) {
	fs.appendFile('K:/My Drive/hb.txt', `${data}\n`, () => {
		console.log(`${data}`);
	});
}

const hbAccounts = [
	// Pages mostly women Visit
	'https://www.instagram.com/downtowndelray/',
	'https://www.instagram.com/visit_delray_beach/',
	'https://www.instagram.com/visitbocaraton/',
	'https://www.instagram.com/bocaratonfl/',
	'https://www.instagram.com/citybocaraton/',
	'https://www.instagram.com/delraybeachopen/',
	'https://www.instagram.com/bluefineart/',
	'https://www.instagram.com/sandbardelraybeach/',
	'https://www.instagram.com/new_vegan76/',
	'https://www.instagram.com/restorationlane/',
	'https://www.instagram.com/delraymag/',
	'https://www.instagram.com/renovatewiththeroots/',
	'https://www.instagram.com/sassafraswpb/',
	'https://www.instagram.com/bocalifemag/',
	'https://www.instagram.com/oldschoolsquaredelray/',
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
