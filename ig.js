require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
<<<<<<< HEAD
const { r, log, device, targetAccounts } = require('./src/helpers');
=======
const { r, log, device, targetAccounts, timeStamp, badAccounts } = require('./src/helpers');
>>>>>>> 6c19d8fc63bd0f90b898d15d70125e00945561c2
const randomAccount = Math.floor(Math.random() * targetAccounts.length);
const r23 = r(2000, 3000);
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: true, args: ['--incognito'] }); /*slowMo: 100,*/
		const page = await browser.newPage();
		await page.emulate(device);

		//----login
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
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
		const flwng = await page.$$eval('a[href$="/following/"]', wng => wng.map(ng => ng.children[0].innerText));
		log(`----flws---- ${flws} -----flwng----- ${flwng} -----`);
<<<<<<< HEAD

=======
>>>>>>> 6c19d8fc63bd0f90b898d15d70125e00945561c2

		//----go to one of the target accounts
		await page.goto(targetAccounts[randomAccount], { waitUntil: 'networkidle2' });
		await page.waitForTimeout(r23);
		log(`Account to Farm followers: ${targetAccounts[randomAccount]}`);

		//----click one random post
		const posts = await page.$x('//img[@class="FFVAD"]');
		if (posts.length > 0) {
			await Promise.all([page.waitForNavigation(), await posts[r(0, posts.length)].tap()]);
			await page.waitForTimeout(r23);
			farmPost = await page.url();
<<<<<<< HEAD
			log('getting likers from this post: ' + farmPost);
=======
			log(`getting likers from this post: ${farmPost}`);
>>>>>>> 6c19d8fc63bd0f90b898d15d70125e00945561c2
		}
		//----click the Likes number on the photo
<<<<<<< HEAD
		await Promise.all([page.waitForNavigation(), page.tap('[href$="liked_by/"]')]);
		await page.waitForTimeout(r23);
		//----pagedown 5 times = 90 followers
=======
		await Promise.all([page.waitForNavigation(), page.tap('[href$="liked_by/"]'), page.focus('[href$="liked_by/"]')]);
		await page.waitForTimeout(r23);

		//----pagedown 5 times to get 72 followers to choose from
>>>>>>> 6c19d8fc63bd0f90b898d15d70125e00945561c2
		for (let i = 0; i < 5; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(500, 1000));
		}
<<<<<<< HEAD

		//---- get a few followers hrefs
		let hrefs = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));
		let x;
		//----ADJUST THIS AMMOUNT OF PROFILES TO GO TO
		let y = r(5, 7);
		if (hrefs.length > 0) {
			for (x = 0; x < y; x++) {
				log(y--);
				let num = r(0, hrefs.length);
				await page.goto('https://www.instagram.com' + hrefs[num]);
				await page.waitForTimeout(r23);
				log('Went Here: ' + (await page.url()));
				//----get the top 24 posts
				let posts = await page.$x('//*[@class="FFVAD"]');
				if (posts.length > 0) {
					let p = r(0, posts.length);
					//----click One random Public post to like
					await Promise.all([page.waitForNavigation(), posts[p].tap()]);
					await page.waitForTimeout(r23);
					log('going to this post: ' + await page.url());
					//----the Like button to hit
					let likeBtn = await page.$x('//*[@aria-label="Like"]');
					if (likeBtn.length > 0) {
						//----Smash that Like btn
						await likeBtn[0].tap();
						await page.waitForTimeout(r23);
						log('Like btn hit here: ' + (await page.url()));
					}
					// THIS USER HAS No Posts, Request to follow
				} else {
					log('--PRIVATE PAGE Do NOTHING:');
=======
		//---- get a few followers hrefs
		const hrefs = await page.$$eval('a[title]', lis => lis.map(li => li.getAttribute('href')));
		let y = r(9, 15);
		log(hrefs);
		if (hrefs.length > 0) {
			//---- loop over each profile [y]-times
			for (let x = 0; x < y; x++) {
				//log(y--);
				let num = r(1, hrefs.length);
				log(hrefs[num]);
				await page.goto('https://www.instagram.com' + hrefs[num] /*{ waitUntil: 'networkidle2' }*/);
				await page.waitForTimeout(r23);
				let currentURL = await page.url();
				let searchBool = badAccounts.includes(currentURL);
				log('Went Here: ' + currentURL);
				if (!searchBool) {
					//----get the top 24 posts
					let posts = await page.$x('//*[@class="FFVAD"]');
					if (posts.length > 0) {
						//---- pick a post to like
						let p = r(1, posts.length);
						//----click One random Public post to like
						await Promise.all([page.waitForNavigation(), posts[p].tap()]);
						await page.waitForTimeout(r23);
						log('going to this post: ' + (await page.url()));
						//----the Like button to hit
						let likeBtn = await page.$x('//*[@aria-label="Like"]');
						if (likeBtn.length > 0) {
							//----Smash that Like btn
							await likeBtn[0].tap();
							await page.waitForTimeout(r23);
							log('Like btn hit here: ' + (await page.url()));
						}
					} else {
						//---- if private, go to next one
						log('--PRIVATE PAGE Do NOTHING:');

						// let follow = await page.$x("//button[contains(text(), 'Follow')]");
						// if (follow.length > 0) {
						// 	await follow[0].tap();
						// 	await page.waitForTimeout(r23);
						// 	log('Followed Private Account: ' + (await page.url()));
						// }
					}
>>>>>>> 6c19d8fc63bd0f90b898d15d70125e00945561c2
				}
			}
		}
		//BACK AND CLOSE BROWSER*/
		await browser.close();
		process.exit(1);
	} catch (e) {
		log('error = ', e);
		process.exit(1);
	}
})();

//----accept_cookies
/*const cookieBtn = await page.$x("//button[contains(text(), 'Accept')]");
if (cookieBtn.length > 0) {
	await cookieBtn[0].tap();
	await page.waitForTimeout(r(1000, 2000));
} else {
	console.log('no notifaction buttons to click');
}*/
