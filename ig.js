const puppeteer = require('puppeteer');
const targetAccounts = require('./targetAccounts');
let r = require('./r');
let r1 = Math.floor(Math.random() * targetAccounts.length);
const iPhone = puppeteer.devices['iPhone X'];
const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');
const savePath = 'C:\\o\\globaldebtsolutions.com\\gds - a\\hb\\';

(async () => {
	try {
		const browser = await puppeteer.launch({ headless: true, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(iPhone);
		//await page.goto('https://bot.sannysoft.com/');
		//await page.waitForTimeout(3000);
		//await page.screenshot({ path: savePath + 'ROBOT_TEST.png', fullPage: true });
		//LOGIN
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", 'username', { delay: r(50, 100) });
		await page.type("[name='password']", 'password', { delay: r(50, 100) });
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
		if (follows.length > 0) {
			for (z = 0; z < 4; z++) {
				let num = r(1, 72 - z);
				await follows[num].tap();
				await page.waitForTimeout(r(3000, 5000));
			}
		} else {
			console.log('error follows:', follows[num]);
		}
		await page.screenshot({ path: savePath + now + '.png', fullPage: true });

		//BACK AND CLOSE BROWSER
		await page.click('svg[aria-label="Close"]');
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		process.exit(1);
	}
})();
