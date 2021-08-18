require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { r, log, fs, device, timeStamp, badAccounts, targetAccounts, randomAccount } = require('./src/helpers');
const r12 = r(1500, 2000);
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
		}

		//---- got to home and screenshot the follower count
		await page.goto('https://www.instagram.com/' + process.env.IG_USER, { waitUntil: 'networkidle0' });
		await page.waitForSelector("a[href$='/following/']");
		const flws = await page.$$eval('a[href$="/followers/"]', flw => flw.map(fl => fl.children[0].innerText));
		const flwng = await page.$$eval('a[href$="/following/"]', wing => wing.map(ing => ing.children[0].innerText));
		await page.screenshot({ path: process.env.SAVE_PATH + 'flws ' + flws + ' flwng ' + flwng + ' ' + timeStamp + '.png' });
		log(`flws ${flws} flwng ${flwng} `);
		/*
		//----go to one of the target accounts
		await page.goto(targetAccounts[randomAccount], { waitUntil: 'networkidle0' });
		await page.waitForTimeout(r12);
		console.log('Random Account to Farm: ' + targetAccounts[randomAccount] + '\n');
		//----click one random post
		const posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			await posts[r(0, posts.length)].tap();
			await page.waitForTimeout(r12);
			console.log('Farming accounts that liked this post: ' + await page.url() + '\n');
		} else {
			console.log('No Posts found: ' + posts.length);
		}
		//----click the Likes number on the photo
		await page.tap('[href$="liked_by/"]');
		await page.waitForTimeout(r12);
		//----pagedown 5 times to get 90 followers to choose from
		let i;
		for (i = 0; i < 5; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r12);
		}
		//----DYNAMICLY CRAWL OVER EACH FOLLOWER
		let likers = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));
		let x;
		let y = r(3, 4);
		if (likers.length > 0) {
			for (x = 0; x < y; x++) {
				//----repeat random between 8 to 10 times
				let num = r(0, likers.length);
				console.log(likers[num]);
				//----goto first random link
				await page.goto('https://www.instagram.com' + likers[num], { waitUntil: 'networkidle0' });
				await page.waitForSelector('#react-root');
				await page.waitForTimeout(r12);
				let currentURL = await page.url();
				console.log(`visiting this page: ${currentURL}`);
				//NEW BIG FOR LOOP CHECK
				for (let bb = 0; bb < badAccounts.length; bb++) {
					if (currentURL.indexOf(badAccounts[bb]) === -1) {
						console.log(` ❌ DID NOT MATCH  ${currentURL} did not match any ${badAccounts[bb]} \n`);
						//----get This users top 24 posts
						let posts = await page.$x('//*[@class="FFVAD"]');
						// IF USER HAS POSTS To CLICK;
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
								// THIS USER HAS No Posts, Request to follow
							} else {
								console.log('LikeBtn Not Found here: ' + (await page.url()));
							}
						} else {
							////Else Follow////
							let follow = await page.$x("//button[contains(text(), 'Follow')]");
							if (follow.length > 0) {
								await follow[0].tap();
								console.log('----Followed Private Page: ' + (await page.url()));
								await page.waitForTimeout(r12);
							}
							// //check if private
							// let privateAcct = await page.$x("//h2[contains(text(), 'This Account is Private')]");
							// if (privateAcct) {
							// 	console.log('--PRIVATE PAGE Do NOTHING: ' + (await page.url()));
							// }
						}
					} else {
						console.log(` ✔️ DID MATCH the current url ${currentURL} did match ${badAccounts[xxx]} of the baddies \n`);
					}
					// THIS USER HAS No Posts, Request to follow
				} else {
					//Else Follow
					let follow = await page.$x("//button[contains(text(), 'Follow')]");
					if (follow.length > 0) {
						await follow[0].tap();
						console.log('----Followed Private Page: ' + await page.url());
						await page.waitForTimeout(r12);
					}
					// //check if private
					// let privateAcct = await page.$x("//h2[contains(text(), 'This Account is Private')]");
					// if (privateAcct) {
					// 	console.log('--PRIVATE PAGE Do NOTHING: ' + await page.url());
					// }
				}
			}
		}*/
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
await page.waitForTimeout(r12)*/
