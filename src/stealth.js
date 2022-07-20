require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { device, r } = require('./helpers');
const r35 = r(3000, 5000);
const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');

const savePath = './stealthCheck-' + now + '.png';
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({
			headless: false,
			executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
			userDataDir: "C:/Users/HB/AppData/Local/Google/Chrome/User Data/Default",
			args: ['--incognito']
		});
		const page = await browser.newPage();
		await page.emulate(device);
		// console.log(savePath);
		// console.log(now);
		//TEST STEALTH
		await page.goto('https://bot.sannysoft.com', { waitUntil: 'networkidle2' });
		await page.screenshot({ path: savePath, fullPage: true });
		await page.waitForTimeout(r35);

		//BACK AND CLOSE BROWSER*/
		//await browser.close();
		//process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		//process.exit(1);
	}
})();
