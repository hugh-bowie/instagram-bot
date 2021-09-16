require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { r, log, device, targetAccounts, badAccounts, comment, timeNow } = require('./src/helpers');
const r23 = r(2000, 3000);
const randomAccount = Math.floor(Math.random() * targetAccounts.length);
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: true, args: ['--incognito'] }); /*slowMo: 100,*/
		const page = await browser.newPage();
		await page.emulate(device);

		//----login
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'networkidle2' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", process.env.IG_USER, { delay: r(15, 50) });
		await page.type("[name='password']", process.env.IG_PW, { delay: r(15, 50) });
		await Promise.all([page.waitForNavigation(), page.tap("[type='submit']")]);
		await page.waitForTimeout(r23);

		//----click notifications
		const notifyBtn = await page.$x('//button[contains(text(), "Not Now")]');
		if (notifyBtn) {
			await notifyBtn[0].tap();
		}

		//---- got to home and screenshot the follower count
		await page.goto('https://www.instagram.com/' + process.env.IG_USER, { waitUntil: 'networkidle0' });
		await page.waitForSelector("a[href$='/following/']");
		const flws = await page.$$eval('a[href$="/followers/"]', flw => flw.map(fl => fl.children[0].innerText));
		const flwng = await page.$$eval('a[href$="/following/"]', wng => wng.map(ng => ng.children[0].innerText));
		log(`${timeNow} ----flws---- ${flws} -----flwng----- ${flwng} -----`);

		//----- Close the 'use the App' button
		const closeBtn = await page.$('button.dCJp8');
		if (closeBtn) {
			await page.tap('button.dCJp8');
		}

		//----go to one of the target accounts
		await page.goto(targetAccounts[randomAccount], { waitUntil: 'networkidle2' });
		await page.waitForTimeout(r23);
		log(`${timeNow} Account to Farm followers: ${targetAccounts[randomAccount]}`);
		await page.keyboard.press('PageDown');
		await page.waitForTimeout(r(400, 500));
		//----click one random post
		let posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			await Promise.all([page.waitForNavigation(), await posts[r(0, posts.length)].tap()]);
			await page.waitForTimeout(r23);
			farmPost = await page.url();
			log(`getting likers from this post: ${farmPost}`);
		}

		//----click the Likes number on the photo
		await Promise.all([page.waitForNavigation(), page.tap('[href$="liked_by/"]'), page.focus('[href$="liked_by/"]')]);
		await page.waitForTimeout(r23);
		//----pagedown 15 times = 90 followers
		for (let i = 0; i < 15; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(200, 500));
		}

		// ---- get only public likers posts 'div.RR-M-.h5uC0' or '$x('//*[@aria-disabled="false"]')
		const publicHrefs = await page.$$eval('div.RR-M-.h5uC0', pub => pub.map(pu => pu.parentElement.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.getAttribute('href')));
		log('publicHrefs: ' + publicHrefs.length + '  \n' + publicHrefs);
		let rNum = (11, 13);
		log('rNum ' + rNum);
		if (publicHrefs.length > 0) {
			//---- loop over each profile [y]-times
			for (let x = 0; x < rNum; x++) {
				await page.goto('https://www.instagram.com' + publicHrefs[x], { waitUntil: 'networkidle2' });
				await page.waitForTimeout(r23);
				let currentURL = await page.url();
				let searchBool = badAccounts.includes(currentURL);
				log(x + ' Went Here: ' + currentURL);
				if (!searchBool) {
					await page.keyboard.press('PageDown');
					await page.waitForTimeout(r(200, 500));
					//----- get top 28 posts
					// ------- potentital alternative selector = $('[href^="/p/"]');
					let posts = await page.$x('//img[@class="FFVAD"]');
					if (posts.length > 0) {
						//---- pick a post to like
						let p = r(0, posts.length);
						//----click One random Public post to like
						await Promise.all([page.waitForNavigation(), posts[p].tap()]);
						await page.waitForTimeout(r23);
						log('Going to this post: ' + (await page.url()));
						//----the Like button to hit
						let likeBtn = await page.$x('//*[@aria-label="Like"]');
						if (likeBtn) {
							//----Smash that Like btn
							await likeBtn[0].tap();
							await page.waitForTimeout(r23);
							//add comment method one
							log('Like btn hit here');
							let commentURL = (await page.url()) + 'comments/';
							await page.goto(commentURL, { waitUntil: 'networkidle2' });
							await page.waitForTimeout(r23);
							await page.tap('textarea.Ypffh');
							await page.waitForTimeout(r23);
							let thisComment = comment[r(0, comment.length)];
							log('thisComment: ' + thisComment);
							await page.type('textarea.Ypffh', thisComment);
							await page.waitForTimeout(r23);
							let postBTN = await page.$x('//button[contains(text(), "Post")]');
							if (postBTN) {
								await postBTN[0].tap();
								await page.waitForTimeout(r23);
							}
						}
					}
				}
			}
		}

		//BACK AND CLOSE BROWSER
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error||||||||||||||>>>>>>>> ' + e);
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
