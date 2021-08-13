require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { device, timeStamp, r, targetAccounts } = require('./src/helpers');
const r12 = r(1500, 2000);
let randomAccount = Math.floor(Math.random() * targetAccounts.length);
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });/*slowMo: 100,*/
		const page = await browser.newPage();
		await page.emulate(device);

		//----login
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", process.env.IG_USER, { delay: r(50, 100) });
		await page.type("[name='password']", process.env.IG_PW, { delay: r(50, 100) });
		await Promise.all([page.waitForNavigation(), page.tap("[type='submit']")]);
		await page.waitForTimeout(r12);

		//----click notifications
		const notifyBtn = await page.$x('//button[contains(text(), "Not Now")]');
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
			await page.waitForTimeout(r12);
		} else {
			console.log('wasnt prompted for notifaction buttons to click');
		}

		//----go to one of the target accounts
		await page.goto(targetAccounts[randomAccount], { waitUntil: 'networkidle2' });
		await page.waitForTimeout(r12);
		console.log('Random Account to Farm: ' + targetAccounts[randomAccount]);

		//----click one random post
		const posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			await posts[r(0, posts.length)].tap();
			await page.waitForTimeout(r12);
			console.log(await page.url());
		} else {
			console.log('No Posts found: ' + posts.length);
		}

		//----click the Likes number on the photo
		await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(r12);

		//----pagedown 4 times to get 72 followers to choose from
		let i;
		for (i = 0; i < 4; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r12);
		}
		//----DYNAMICLY CRAWL OVER EACH FOLLOWER
		let likers = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));
		let x;
		//----ADJUST THIS AMMOUNT OF PROFILES TO GO TO
		let y = r(5, 6);
		if (likers.length > 0) {
			for (x = 0; x < y; x++) {
				//----repeat random between 4 to 5 times
				let num = r(0, likers.length);
				//----goto first random link
				await page.goto('https://www.instagram.com' + likers[num]);
				await page.waitForSelector('#react-root');
				console.log('visiting this page: ' + await page.url());
				await page.waitForTimeout(r12);

				//----get This users top 24 posts
				let posts = await page.$x('//*[@class="FFVAD"]');
				// IF USER HAS POSTS To CLICK
				if (posts.length > 0) {
					let p = r(0, posts.length);
					//----click One random Public post to like
					await posts[p].tap();
					await page.waitForTimeout(r12);
					console.log(await page.url());

					//----get all the like buttons----
					let likeBtn = await page.$x('//*[@aria-label="Like"]');
					if (likeBtn.length > 0) {
						//----SMASH THAT LIKE BUTTON
						await likeBtn[0].tap();
						await page.waitForTimeout(r12);
						console.log('Like Button Tapped');
					} else {

						console.log('LikeBtn Not Found here: ' + await page.url());
					}
					// THIS USER HAS No Posts, Request to follow				
				} else {
					let follow = await page.$x("//button[contains(text(), 'Follow')]");
					if (follow.length > 0) {
						await follow[0].tap();
						console.log('----Followed Private Page: ' + await page.url());
						await page.waitForTimeout(r12);
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


/*-------click not now app
const appBtn = await page.$x('//*[@href="/"]');
if (appBtn.length > 0) {
await appBtn[0].tap();
console.log('tapped that Not Now button');
await page.waitForTimeout(r12);*/