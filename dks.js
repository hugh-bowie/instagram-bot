require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, device, badAccounts, timeNow, r15, log } = require('./src/helpers');
const { memeAccounts, logD } = require('./src/meme');

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
		await page.type("[name='username']", process.env.DKS, { delay: r(20, 50) });
		await page.type("[name='password']", process.env.DKSPW, { delay: r(20, 50) });
		await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap("[type='submit']")]);
		//----click notifications
		const notifyBtn = await page.$x('//*[contains(text(), "Not Now")]');
		if (notifyBtn) {
			await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), notifyBtn[0].tap()]);
			await page.waitForTimeout(r15);
		}
		//---- got to home and screenshot the follower count
		await page.goto('https://www.instagram.com/' + process.env.DKS, { waitUntil: 'networkidle2' });
		await page.waitForSelector("a[href$='/following/']");
		const user = await page.$eval('h1.K3Sf1', use => use.innerText);
		const flws = await page.$$eval('a[href$="/followers/"]', flw => flw.map(fl => fl.children[0].innerText));
		const flwng = await page.$$eval('a[href$="/following/"]', wng => wng.map(ng => ng.children[0].innerText));
		logD(`•• ${user} Flwrs:${flws} Flwng:${flwng}  ${timeNow}`);
		log(`\n•• ${user} Flwrs:${flws} Flwng:${flwng}  ${timeNow}`);
		//----- Close the 'use the App' button
		const closeBtn = await page.$('button.dCJp8');
		if (closeBtn) {
			await page.tap('button.dCJp8');
		}
		//----go to one of the target accounts
		let farmAccount = await memeAccounts[r(1, memeAccounts.length)];
		await page.goto(farmAccount, { waitUntil: 'networkidle2' });
		log(`Farming this Account: ${farmAccount}`);
		await page.keyboard.press('PageDown');
		await page.waitForTimeout(r15);
		//----goto one random post
		let postHrefs = await page.$$eval('a[href^="/p/"]', href => href.map(hre => hre.getAttribute('href')));
		if (postHrefs) {
			let rPost = r(0, postHrefs.length);
			await page.goto('https://www.instagram.com' + postHrefs[rPost], { waitUntil: 'networkidle2' });
			log(`Targeting users who liked post number ${rPost}  ` + (await page.url()));
			await page.waitForTimeout(r15);
		}
		//----click the Likes number on the photo
		let likedByBtn = await page.$('[href$="liked_by/"]'); //'a[href$="liked_by/"]'
		if (likedByBtn) {
			await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap('[href$="liked_by/"]')]);
			await page.waitForTimeout(r15);
		}
		//----pagedown 20 times = 90 followers
		for (let i = 0; i < 20; i++) {
			await page.keyboard.press('PageDown');
			await page.waitForTimeout(r(300, 700));
		}
		// ---- get only public likers posts 'div.RR-M-.h5uC0' or '$x('//*[@aria-disabled="false"]')
		let publicHrefs = await page.$$eval('div.RR-M-.h5uC0', pub => pub.map(pu => pu.parentElement.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.getAttribute('href')));
		log(`Found ${publicHrefs.length} Public accounts`);
		let rNum = r(17, 23);
		log(`visiting ${rNum} accounts`);
		if (publicHrefs) {
			//---- loop over each profile [y]-times
			for (let x = 0; x < rNum; x++) {
				await page.goto('https://www.instagram.com' + publicHrefs[x], { waitUntil: 'networkidle2' }); // >>>>>>>> USER WITH ZERO POSTS >>>>>'https://www.instagram.com/jasminee.hampton/'
				await page.waitForTimeout(r15);
				let currentURL = await page.url();
				let searchBool = badAccounts.includes(currentURL);
				let postCount = await page.$x('//*[contains(text(), "No Posts Yet")]');
				if (postCount.length === 0) {
					if (!searchBool) {
						// view their story
						let viewStoryBtn = await page.$x('//*[@aria-disabled="false"]');
						if (viewStoryBtn) {
							await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), viewStoryBtn[0].tap()]);
							await page.waitForTimeout(r(2000, 3000));
							log(`	★ ${x} viewing this story ` + await page.url());
							let closeBtn = await page.$x('//*[@aria-label="Close"]');
							if (closeBtn.length === 1) {
								await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), closeBtn[0].tap()]);
								await page.waitForTimeout(r15);
							} else {
								await page.goBack({ waitUntil: 'networkidle2' });
							}
						}
						await page.waitForTimeout(r15);
						//----- get top 28 posts
						let posts = await page.$x('//*[@class="FFVAD"]'); // ------- potentital alternative selector = $('[href^="/p/"]');
						if (posts) {
							//---- pick a post to like
							let p = r(0, posts.length);
							//----click One random Public post to like
							await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), posts[p].tap()]);
							await page.waitForTimeout(r15);
							//----the Like button to hit
							let likeBtn = await page.$x('//*[@aria-label="Like"]');
							if (likeBtn) {
								//----Smash that Like btn
								await page.waitForTimeout(r15);
								await likeBtn[0].tap();
								log(`		♥ Liked post number ${p} ` + (await page.url()));
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
		}
		//BACK AND CLOSE BROWSER
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log(`ERROR ERROR ERROR ERROR\n${e}\nERROR ERROR ERROR ERROR`);
		process.exit(1);
	}
})();
