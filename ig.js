require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const device = require('./device');
const targetAccounts = require('./targetAccounts');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
let r = require('./rndm');
const r35 = r(1000, 2000);
let r1 = Math.floor(Math.random() * targetAccounts.length);
//const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');
const savePath = process.env.SAVE_PATH;
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(device);

		//----Stealth Check

		//await page.goto('https://bot.sannysoft.com', { waitUntil: 'load' });
		//await page.screenshot({ path: savePath, fullPage: true });
		//await page.waitForTimeout(r35);

		//----login

		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
		//----accept_cookies
		/*const cookieBtn = await page.$x("//button[contains(text(), 'Accept')]");
		if (cookieBtn.length > 0) {
			await cookieBtn[0].tap();
			await page.waitForTimeout(r(1000, 2000));
		} else {
			console.log('no notifaction buttons to click');
		}*/
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", process.env.IG_USER, { delay: r(50, 100) });
		await page.type("[name='password']", process.env.IG_PW, { delay: r(50, 100) });
		await Promise.all([page.waitForNavigation(), page.tap("[type='submit']")]);
		await page.waitForTimeout(r35);
		//----notifications
		const notifyBtn = await page.$x('//button[contains(text(), "Not Now")]');
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
			await page.waitForTimeout(r35);
		} else {
			console.log('no notifaction buttons to click');
		}
		//----target_account
		await page.goto(targetAccounts[r1]);
		await page.waitForTimeout(r35);
		//----all_account_posts
		const posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			await posts[r(0, posts.length)].tap();
			await page.waitForTimeout(r35);
		} else {
			console.log('posts', posts.length);
		}
		//----liked_by
		await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(r35);
		//----pagination_72_followers
		let i;
		for (i = 0; i < 4; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(1000, 2000));
		}
		//DYNAMIC CRAWL EACH FOLLOWER
		let likers = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));
		let x;
		let y = r(7, 10);
		if (likers.length > 0) {
			for (x = 0; x < y; x++) {
				//------------------------------------------------repeat 4,7 times
				let num = r(0, likers.length);
				await page.goto('https://www.instagram.com' + likers[num]); //----------goto a random link
				await page.waitForTimeout(r(1000, 2000));
				await page.waitForSelector('#react-root');
				let posts = await page.$x('//*[@class="FFVAD"]'); //--------------------get users top 24 posts
				if (posts.length > 0) {
					//----------------------------------------------if users posts are public
					let p = r(0, posts.length);
					await posts[p].tap(); //--------------------------------------------click random post to like
					await page.waitForTimeout(r(1000, 2000));
					//----get all the like buttons----
					let like = await page.$x('//*[@aria-label="Like"]');
					if (like.length > 0) {
						await like[0].tap(); //-----------------------------------------you liked that shit
						await page.waitForTimeout(r(1000, 2000));
					} else {
						//-------------------------------------------------------------if users posts are private
						let follow = await page.$x("//button[contains(text(), 'Follow')]");
						if (follow.length > 0) {
							await follow[0].tap();
							await page.waitForTimeout(r(1000, 2000));
						}
					}
				}
			}
		}
		//BACK AND CLOSE BROWSER*/
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		process.exit(1);
	}
})();
