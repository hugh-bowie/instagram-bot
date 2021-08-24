require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { r, log, fs, device, timeStamp } = require('./src/helpers');
const { targetAccounts, badAccounts } = require('./src/accountFarm');
const r23 = r(2000, 3000);
const randomAccount = Math.floor(Math.random() * targetAccounts.length);
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] }); //////// slowMo: 100,
		const page = await browser.newPage();
		await page.emulate(device);
		//console.log('badAccounts: ' + badAccounts);

		//----login
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'networkidle2' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", process.env.IG_USER, { delay: r(50, 100) });
		await page.type("[name='password']", process.env.IG_PW, { delay: r(50, 100) });
		await Promise.all([page.waitForNavigation(), page.tap("[type='submit']")]);
		await page.waitForTimeout(r23);

		//----click notifications
		const notifyBtn = await page.$x('//button[contains(text(), "Not Now")]');
		if (notifyBtn.length > 0) {
			await notifyBtn[0].tap();
			await page.waitForTimeout(r23);
		}

		//---- got to home and screenshot the follower count
		await page.goto('https://www.instagram.com/' + process.env.IG_USER, { waitUntil: 'networkidle0' });
		await page.waitForSelector("a[href$='/following/']");
		const flws = await page.$$eval('a[href$="/followers/"]', flw => flw.map(fl => fl.children[0].innerText));
		const flwng = await page.$$eval('a[href$="/following/"]', wing => wing.map(ing => ing.children[0].innerText));
		//await page.screenshot({ path: process.env.SAVE_PATH + 'flws ' + flws + ' flwng ' + flwng + ' ' + timeStamp + '.png' });
		log(`----flws---- ${flws} -----flwng----- ${flwng} -----`);

		//----go to one of the target accounts
		await page.goto(targetAccounts[randomAccount], { waitUntil: 'networkidle0' });
		await page.waitForTimeout(r23);
		log(`Account to Farm followers: ${targetAccounts[randomAccount]}`);
		//----click one random post
		const posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			await Promise.all([page.waitForNavigation(), posts[r(0, posts.length)].tap()]);
			await page.waitForTimeout(r23);
			log(`getting likers from this post: ` + (await page.url()));
		}

		//----click the Likes number on the photo
		await Promise.all([page.waitForNavigation(), await page.tap('[href$="liked_by/"]')]);
		await page.waitForTimeout(r23);

		//----pagedown 5 times to get 90 followers to choose from
		let i;
		for (i = 0; i < 5; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r23);
		}

		//----DYNAMICLY CRAWL OVER EACH FOLLOWER
		let likers = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));

		//----How many accounts to visit?
		let y = r(6, 9);
		if (likers.length > 0) {
			//---- loop over each profile [y]-times
			for (let x = 0; x < y; x++) {
				//---- pick a random account from [y]
				let num = r(0, likers.length);
				log(`${likers[num]}`);
				//----goto first random account
				await page.goto('https://www.instagram.com' + likers[num], { waitUntil: 'networkidle0' });
				await page.waitForSelector('#react-root');
				await page.waitForTimeout(r23);
				let currentURL = await page.url();
				log(`visiting this page: ${currentURL}`);

				//----CHECK IF YOURE ON A BAD ACCOUNTS------
				for (let bb = 0; bb < badAccounts.length; bb++) {
					if (currentURL.indexOf(badAccounts[bb]) === -1) {

						//----get the top 24 posts
						let posts = await page.$x('//*[@class="FFVAD"]');
						if (posts.length > 0) {
							//---- pick a post to like
							let p = r(0, posts.length);

							//----click One random Public post to like
							await posts[p].tap();
							await page.waitForSelector('div.MEAGs');
							await page.waitForTimeout(r23);

							//----the Like button to hit
							let likeBtn = await page.$x('//*[@aria-label="Like"]');
							if (likeBtn.length > 0) {
								//----Smash that Like btn
								await likeBtn[0].tap();
								await page.waitForTimeout(r23);
								log('Like btn hit here: ' + (await page.url()));
							}

						} else {//if no posts to like (Account is private)
							//----Follow Btn
							let follow = await page.$x("//button[contains(text(), 'Follow')]");
							if (follow.length > 0) {
								await follow[0].tap();
								await page.waitForTimeout(r23);
								log('Followed Private Account: ' + (await page.url()));
								//---- if private, go to next one
								// let privateAcct = await page.$x("//h2[contains(text(), 'This Account is Private')]");
								// if (privateAcct) {
								// 	console.log('--PRIVATE PAGE Do NOTHING: ' + (await page.url()));
								// }
							}

						}

					}
				}
			}
		}
		//BACK AND CLOSE BROWSER
		//await browser.close();
		//process.exit(1);
	} catch (e) {
		console.log('error = ', e);
		//process.exit(1);
	}
})();

/*-------click not now app
const appBtn = await page.$x('//*[@href="/"]');
if (appBtn.length > 0) {
await appBtn[0].tap();
console.log('tapped that Not Now button');
await page.waitForTimeout(r23)*/
