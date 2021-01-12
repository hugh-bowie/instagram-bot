

const puppeteer = require('puppeteer');
const trgtAccts = require('./targetAccounts');
let r1 = Math.floor(Math.random() * trgtAccts.length);
const iPhone = puppeteer.devices['iPhone X'];

(async () => {
	try {
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(iPhone);
		//LOGIN
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", 'onllymadisonmay');
		await page.type("[name='password']", 'Lxk7zUx2VpGsqHGfc8H!');
		await Promise.all([
			page.waitForNavigation(),
			page.tap("[type='submit']")
		]);
		await page.waitForTimeout(4000);
		//Click The NOT NOW BUTTON
		const notifyBtn = await page.$x("//button[contains(text(), 'Not Now')]");
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
		} else {
			console.log('no notifaction buttons to click');
		}
		await page.waitForTimeout(4000);
		//GOTO RANDOM ACCOUNT FROM LIST
		await page.goto(trgtAccts[r1]);
		await page.waitForTimeout(3500);
		//GET TOP 22 POSTS
		const posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			const r22 = Math.floor(Math.random() * 22) + 1;
			await posts[r22].tap();
		} else {
			console.log('posts[rndP]', posts[rndP]);
		}
		await page.waitForTimeout(3152);
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

			await follows[r72].tap({ delay: 666 });
			await follows[r71].tap({ delay: 555 });
			await follows[r70].tap({ delay: 888 });
			await follows[r69].tap({ delay: 777 });

		} else {
			console.log('error', r72);
		}

		await page.click('svg[aria-label="Close"]');

		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		process.exit(1);
	};
})(); 
