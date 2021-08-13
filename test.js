require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const targetAccounts = require('./targetAccounts');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const device = require('./device');
let r = require('./rndm');
const r10 = r(50, 1000);
const r12 = r(1000, 2000);
const r23 = r(2000, 3000);
const r35 = r(3000, 5000);
let rAcct = Math.floor(Math.random() * targetAccounts.length);
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
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

		// //-------click not now app
		// const appBtn = await page.$x('//*[@href="/"]');
		// if (appBtn.length > 0) {
		// 	await appBtn[0].tap();
		// 	console.log('tapped that Not Now button');
		// 	await page.waitForTimeout(r12);

		//----click notifications
		const notifyBtn = await page.$x('//button[contains(text(), "Not Now")]');
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
			console.log('Hit the Not Now Notifications Buttn');
			await page.waitForTimeout(r12);
		} else {
			console.log('wasnt prompted for notifaction buttons to click');
		}

		//----go to one of the target accounts
		await page.goto(targetAccounts[rAcct], { waitUntil: 'networkidle2' });
		await page.waitForTimeout(r12);
		console.log('First Targeted Account from the list: ' + targetAccounts[rAcct]);

		//----click one random post
		const posts = await page.$x('//*[@class="FFVAD"]');
		console.log('Posts Length: ' + posts.length);
		if (posts.length > 0) {
			const postSelected = await posts[r(0, posts.length)].tap();
			console.log('postSelected:' + postSelected);
			await page.waitForTimeout(r12);
			//await page.screenshot({ path: 'picone.png', fullPage: true });/////////////////////////////////////////////////////
		} else {
			console.log('No Posts found:' + posts.length);
		}

		//----click the Likes number on the photo
		const photoNumber = await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(r12);
		console.log('photoNumber: ' + photoNumber);
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
		let y = r(4, 5);
		if (likers.length > 0) {
			for (x = 0; x < y; x++) {
				//----repeat random between 4 to 5 times
				let num = r(0, likers.length);
				//----goto first random link
				await page.goto('https://www.instagram.com' + likers[num]);
				await page.waitForTimeout(r12);
				await page.waitForSelector('#react-root');
				console.log(await page.url());
				//await page.screenshot({ path: 'pic3.png', fullPage: true });
				//----get This users top 24 posts
				let posts = await page.$x('//*[@class="FFVAD"]');
				//----if users posts are public
				if (posts.length > 0) {
					let p = r(0, posts.length);
					//----click One random Public post to like
					await posts[p].tap();
					await page.waitForTimeout(r12);
					//----get all the like buttons----
					let like = await page.$x('//*[@aria-label="Like"]');
					console.log('Like: ' + like.length);
					//let privateAcct = await page.$x('//*[@class="rkEop"]')
					//console.log('PrivateAcct: ' + privateAcct.length);
					if (like.length > 0) {
						//----SMASH THAT LIKE BUTTON
						await like[0].tap();
						await page.waitForTimeout(r12);
					} else {
						//----FOLLOW THE PRIVATE PROFILES
						let follow = await page.$x("//button[contains(text(), 'Follow')]");
						if (follow.length > 0) {
							await follow[0].tap();
							console.log('Follow Clicked, Length = ' + follow.length);
							await page.waitForTimeout(r12);
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
		//process.exit(1);
	}
})();
