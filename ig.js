const puppeteer = require('puppeteer-extra');
const device = require('./device');
const targetAccounts = require('./targetAccounts');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
let r = require('./r');
let r1 = Math.floor(Math.random() * targetAccounts.length);
const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');
const savePath = 'C:\\o\\globaldebtsolutions.com\\gds - a\\hb\\';
puppeteer.use(StealthPlugin());

(async () => {
	try {
		const browser = await puppeteer.launch({ headless: true, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(device);
		//CHECK BOT VISIBILITY
		//await page.goto('https://bot.sannysoft.com/');		
		//await page.waitForTimeout(3000);
		//await page.screenshot({ path: savePath + 'ROBOT_TEST.png', fullPage: true });
		//REPORT LEXXFOXX
		/*await page.goto('https://www.tiktok.com/@lexx.foxx?lang=en', { waitUntil: 'load' });
		await page.waitForSelector('div.jsx-966597281.guide > span');
		await page.click('div.jsx-966597281.guide > span');
		await page.waitForTimeout(3000);
		await page.click('#main > div > div > header > div.jsx-239651328.header-icon.header-right > svg');
		await page.waitForTimeout(3000);
		await page.click('#tiktok-share > div > div > div.jsx-2204186530.icontainer.report-container > div > div > svg > path:nth-child(2)');
		await page.waitForTimeout(3000);
		await page.click('#main > div > div > div.jsx-2200220622.main.inbox > form > div > label:nth-child(2) > span.jsx-158707282.radio-icon > i');
		await page.waitForTimeout(3000);
		await page.click('#main > div > div > div.jsx-2200220622.main.inbox > form > button');
		await page.waitForTimeout(3000);*/

		//INITiLIAZE
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });

		//ACCEPT COOKIES SCREEN
		const cookieBtn = await page.$x("//button[contains(text(), 'Accept')]");
		if (cookieBtn.length > 0) {
			await cookieBtn[0].tap();
			await page.waitForTimeout(r(1000, 2000));
		} else {
			console.log('no notifaction buttons to click');
		}

		//LOGIN
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", 'dinkinn.flicka', { delay: r(50, 100) });
		await page.type("[name='password']", 'Hb24pZ26gLUiScwy0PA', { delay: r(50, 100) });
		await Promise.all([page.waitForNavigation(), page.tap("[type='submit']")]);
		await page.waitForTimeout(r(3000, 5000));

		//Click The NOT NOW BUTTON
		const notifyBtn = await page.$x("//button[contains(text(), 'Not Now')]");
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
			await page.waitForTimeout(r(3000, 5000));
		} else {
			console.log('no notifaction buttons to click');
		}

		//GOTO RANDOM ACCOUNT FROM LIST
		await page.goto(targetAccounts[r1]);
		await page.waitForTimeout(r(3000, 5000));

		//GET TOP 22 POSTS
		const posts = await page.$x('//*[@sizes="123px"]');
		if (posts.length > 0) {
			await posts[r(1, 22)].tap();
			await page.waitForTimeout(r(3000, 5000));
		} else {
			console.log('posts', posts.length);
		}

		//HIT THE LIKED BY BUTTON
		await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(r(3000, 5000));

		//GET PAGINATION 72 FOLLOWERS 
		let i;
		for (i = 0; i < 5; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(3000, 5000));
		}

		//TAP FOLLOW BUTTON FOR THESE FOOLS
		const follows = await page.$x("//button[contains(text(), 'Follow')]");
		let z;
		let r7 = r(4, 7);
		if (follows.length > 0) {
			for (z = 0; z < r7; z++) {
				let num = r(1, 72 - z);
				await follows[num].tap();
				await page.waitForTimeout(r(3000, 5000));
			}
		} else {
			console.log('error follows:', follows[num]);
		}
		await page.screenshot({ path: savePath + now + '.png', fullPage: true });

		//BACK AND CLOSE BROWSER
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		process.exit(1);
	}
})();






/*

let r72 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 71) + 1);
let r71 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 70) + 1);
let r70 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 69) + 1);
let r69 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 68) + 1);*/
