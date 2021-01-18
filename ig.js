const puppeteer = require('puppeteer-extra');
const device = require('./device');
const targetAccounts = require('./targetAccounts');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
let r = require('./r');
const r35 = r(3000, 5000);
let r1 = Math.floor(Math.random() * targetAccounts.length);
const now = new Date().toLocaleString().replace(/\//g, '.').replace(/:/g, '.').replace(', ', '_').replace(' ', '.');
const savePath = 'C:\\o\\globaldebtsolutions.com\\gds - a\\hb\\';
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: true, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(device);
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
		await page.type("[name='username']", 'hb.iv', { delay: r(50, 100) });
		await page.type("[name='password']", 'Hb24pZ26gLUiScwy0Pa', { delay: r(50, 100) });
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
		const posts = await page.$x('//*[@sizes="136px"]');
		if (posts.length > 0) {
			await posts[r(1, 22)].tap();
			await page.waitForTimeout(r35);
		} else {
			console.log('posts', posts.length);
		}
		//----liked_by
		await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(r35);
		//----pagination_72_followers 
		let i;
		for (i = 0; i < 5; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(1000, 2000));
		}
		//DYNAMIC CRAWL EACH FOLLOWER
		let likers = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));
		let x;
		let y = r(8, 10);
		if (likers.length > 0) {
			for (x = 0; x < y; x++) {//------------------------------------------------repeat 4,7 times
				let num = r(0, likers.length);
				await page.goto('https://www.instagram.com' + likers[num]);//----------goto a random link
				await page.waitForTimeout(r(4000, 5000));
				await page.waitForSelector('#react-root');
				let posts = await page.$x('//*[@sizes="136px"]');//--------------------get users top 24 posts
				if (posts.length > 0) {//----------------------------------------------if users posts are public
					let p = r(0, posts.length);
					await posts[p].tap();//--------------------------------------------click random post to like
					await page.waitForTimeout(r35);
					//----get all the like buttons----
					let like = await page.$x('//*[@aria-label="Like"]');
					if (like.length > 0) {
						await like[0].tap();//-----------------------------------------you liked that shit
						await page.waitForTimeout(r(3000, 5000));
					} else {
						console.log('like btn selector not found');
					}
				} else {//-------------------------------------------------------------if users posts are private
					let follow = await page.$x("//button[contains(text(), 'Follow')]");
					if (follow.length > 0) {
						await follow[0].tap();
						await page.waitForTimeout(r(2000, 3000));
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





/*		//REPORT LEXXFOXX
		await page.goto('https://www.tiktok.com/@lexx.foxx?lang=en', { waitUntil: 'load' });
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
		await page.waitForTimeout(3000);
let r72 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 71) + 1);
let r71 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 70) + 1);
let r70 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 69) + 1);
let r69 = Math.abs(Math.floor(Math.random() * 72) + 1 - Math.floor(Math.random() * 68) + 1);*/
