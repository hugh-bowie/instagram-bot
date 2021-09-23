require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { r, device, badAccounts, timeNow, r15, r23 } = require('./src/helpers');
const { memeAccounts, logD } = require('./src/meme');
const randomAccount = Math.floor(Math.random() * memeAccounts.length);
puppeteer.use(StealthPlugin());

(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: true, args: ['--incognito'] }); //////// slowMo: 100,
		const page = await browser.newPage();
		await page.emulate(device);

		//----login
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'networkidle2' });
		await page.waitForSelector("[name='username']");
		await page.tap("[name='username']");
		await page.type("[name='username']", process.env.DKS, { delay: r(15, 50) });
		await page.type("[name='password']", process.env.DKSPW, { delay: r(15, 50) });
		await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap("[type='submit']")]);
		await page.waitForTimeout(r15);

		//----click notifications
		const notifyBtn = await page.$x('//*[contains(text(), "Not Now")]');
		if (notifyBtn) {
			await notifyBtn[0].tap();
			await page.waitForTimeout(r15);
		}

		//---- got to home and screenshot the follower count
		await page.goto('https://www.instagram.com/' + process.env.DKS, { waitUntil: 'networkidle2' });
		await page.waitForSelector("a[href$='/following/']");
		const user = await page.$eval('h1.K3Sf1', use => use.innerText);
		const flws = await page.$$eval('a[href$="/followers/"]', flw => flw.map(fl => fl.children[0].innerText));
		const flwng = await page.$$eval('a[href$="/following/"]', wng => wng.map(ng => ng.children[0].innerText));
		logD(`\n${user}  Flwrs:${flws}  Flwng:${flwng} 	 ${timeNow}`);

		//----- Close the 'use the App' button
		const closeBtn = await page.$('button.dCJp8');
		if (closeBtn) {
			await page.tap('button.dCJp8');
		}

		//----go to one of the target accounts
		await page.goto(memeAccounts[randomAccount], { waitUntil: 'networkidle2' });
		await page.waitForTimeout(r15);
		logD(`Farming this Account: ${memeAccounts[randomAccount]}`);
		await page.keyboard.press('PageDown');
		await page.waitForTimeout(r(400, 500));
		await page.keyboard.press('PageDown');

		//----click one random post
		let posts = await page.$x('//*[@class="FFVAD"]');
		if (posts.length > 0) {
			await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), await posts[r(0, posts.length)].tap()]);
			await page.waitForTimeout(r23);
			farmPost = await page.url();
			logD(`Get Users from this post: ${farmPost}`);
		}

		//----click the Likes number on the photo
		await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), await page.tap('[href$="liked_by/"]')]);
		await page.waitForTimeout(r23);
		//----pagedown 15 times = 90 followers
		for (let i = 0; i < 20; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(200, 500));
		}

		// ---- get only public likers posts 'div.RR-M-.h5uC0' or '$x('//*[@aria-disabled="false"]')
		const publicHrefs = await page.$$eval('div.RR-M-.h5uC0', pub => pub.map(pu => pu.parentElement.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.getAttribute('href')));
		logD(`Found ${publicHrefs.length} Public accounts`);
		let rNum = (11, 13);
		logD(`number of loops ${rNum}`);
		if (publicHrefs.length > 0) {
			//---- loop over each profile [y]-times
			for (let x = 0; x < rNum; x++) {
				await page.goto('https://www.instagram.com' + publicHrefs[x], { waitUntil: 'networkidle2' });
				await page.waitForTimeout(r15);
				const currentURL = await page.url();
				const searchBool = badAccounts.includes(currentURL);
				logD(`	★ viewing this story ${currentURL}`);
				if (!searchBool) {
					// view their story
					const viewStoryBtn = await page.$x('//*[@aria-disabled="false"]');
					if (viewStoryBtn.length > 0) {
						await viewStoryBtn[0].tap();
						await page.waitForTimeout(r(3000, 4000));
						await page.goBack({ waitUntil: 'networkidle0' });
					}
					await page.waitForTimeout(r15);
					await page.keyboard.press('PageDown');
					//----- get top 28 posts
					const posts = await page.$x('//*[@class="FFVAD"]'); // ------- potentital alternative selector = $('[href^="/p/"]');
					if (posts.length > 3) {
						//---- pick a post to like
						const p = r(0, posts.length);
						//----click One random Public post to like
						await Promise.all([page.waitForNavigation(), await posts[p].tap()]);
						await page.waitForTimeout(r23);
						logD(`		♥ Liked this post ` + (await page.url()));
						//----the Like button to hit
						const likeBtn = await page.$x('//*[@aria-label="Like"]');
						if (likeBtn) {
							//----Smash that Like btn
							await likeBtn[0].tap();
							await page.waitForTimeout(r15);
							//add comment method one
							// const commentURL = (await page.url()) + 'comments/';
							// await page.goto(commentURL, { waitUntil: 'networkidle2' });
							// await page.waitForTimeout(r15);
							// await page.tap('textarea.Ypffh');
							// await page.waitForTimeout(r15);
							// const thisComment = memeComments[r(0, memeComments.length)];
							// logD(`			✎ Comment: ${thisComment}\n`);
							// await page.type('textarea.Ypffh', thisComment);
							// await page.waitForTimeout(r15);
							// const postBTN = await page.$x('//button[contains(text(), "Post")]');
							// if (postBTN) {
							// 	await postBTN[0].tap();
							// 	await page.waitForTimeout(r23);
							// }
						}
					}
				}
			}
		}
		//BACK AND CLOSE BROWSER
		await browser.close();
		process.exit(1);
	} catch (e) {
		logD('error||||||||||||||>>>>>>>> ' + e);
		process.exit(1);
	}
})();
