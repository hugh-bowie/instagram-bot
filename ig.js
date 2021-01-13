const puppeteer = require('puppeteer');
const targetAccounts = require('./targetAccounts');
let r = require('./r');
let r1 = Math.floor(Math.random() * targetAccounts.length);
const iPhone = puppeteer.devices['iPhone X'];
const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');
const savePath = 'C:\\o\\globaldebtsolutions.com\\gds - a\\hb\\';

(async () => {
	try {
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(iPhone);
		//LOGIN
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", 'hb.iv', { delay: r(5, 20) });
		await page.type("[name='password']", 'Hb24pZ26gLUiScwy0PA', { delay: r(5, 20) });
		await Promise.all([page.waitForNavigation(), page.tap("[type='submit']")]);
		await page.waitForTimeout(r(3000, 5000));
		//Click The NOT NOW BUTTON
		const notifyBtn = await page.$x("//button[contains(text(), 'Not Now')]");
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
		} else {
			console.log('no notifaction buttons to click');
		}
		await page.waitForTimeout(r(3000, 5000));
		//GOTO RANDOM ACCOUNT FROM LIST
		await page.goto(targetAccounts[r1]);
		await page.waitForTimeout(r(3000, 5000));
		//GET TOP 22 POSTS
		const posts = await page.$x('//*[@sizes="123px"]');
		if (posts.length > 0) {
			const r22 = Math.floor(Math.random() * 22) + 1;
			await posts[r22].tap();
		} else {
			console.log('posts[rndP]', posts[rndP]);
		}
		await page.waitForTimeout(3152);
		await page.screenshot({ path: savePath + now + '.png', fullPage: true });
		let postURL = await page.url();
		console.log('postURL: ', postURL);
		//HIT THE LIKED BY BUTTON
		await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(4239);
		//GET 72 FOLLOWERS
		await page.keyboard.press('PageDown', { delay: 801 });
		await page.keyboard.press('PageDown', { delay: 659 });
		await page.keyboard.press('PageDown', { delay: 499 });
		await page.keyboard.press('PageDown', { delay: 719 });
		await page.keyboard.press('PageDown', { delay: 519 });

		let follows = await page.$x("//button[contains(text(), 'Follow')]");
		if (follows.length > 0) {
			let r72 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 71) + 1);
			let r71 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 70) + 1);
			let r70 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 69) + 1);
			let r69 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 68) + 1);

			await follows[r72].tap({ delay: 1123 });
			await follows[r71].tap({ delay: 1091 });
			await follows[r70].tap({ delay: 996 });
			await follows[r69].tap({ delay: 892 });
		} else {
			console.log('error', r72);
		}
		//BACK AND CLOSE BROWSER
		await page.click('svg[aria-label="Close"]');
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		process.exit(1);
	}
})();
