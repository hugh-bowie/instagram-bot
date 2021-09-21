require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const device = require('./src/device');
let r = require('./src/rndm');
const r35 = r(3000, 5000);
const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');

const savePath = './stealthCheck-' + now + '.png';
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(device);
		console.log(savePath);
		console.log(now);
		//TEST STEALTH
		await page.goto('https://bot.sannysoft.com', { waitUntil: 'load' });
		await page.screenshot({ path: savePath, fullPage: true });
		await page.waitForTimeout(r35);

		//BACK AND CLOSE BROWSER*/
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		process.exit(1);
	}
})();
