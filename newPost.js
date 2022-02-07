require('dotenv').config();
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { r, log, device, timeNow } = require('./src/helpers');
let { fullCaption } = require('./src/meme');
let photos = fs.readdirSync('./img/new/');
let photoPost = photos[Math.floor(Math.random() * photos.length)];
const oldPath = './img/new/' + photoPost; //IMG_4875.jpg
const newPath = './img/used/' + photoPost; //IMG_4875.jpg
const r23 = r(2000, 3000);
const r15 = r(1000, 1500);


(async () => {
	try {
		//----initialize
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] }); //////// slowMo: 100,
		const page = await browser.newPage();
		await page.emulate(device);

		//----login
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'networkidle2' });
		await page.waitForSelector("[name='username']", { visible: true });
		await page.tap("[name='username']");
		await page.type("[name='username']", process.env.HB, { delay: r(15, 50) });
		await page.type("[name='password']", process.env.PW, { delay: r(15, 50) });
		await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap("[type='submit']")]);

		//----click no notifications
		const notifyBtn = await page.$x('//*[contains(text(), "Not Now")]');
		if (notifyBtn) {
			await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), notifyBtn[0].tap()]);
			await page.waitForTimeout(r23);
		}

		//----click no to homescreen
		const cancelBtn = await page.$x('//*[contains(text(), "Cancel")]');
		if (cancelBtn) {
			await cancelBtn[0].tap();
			await page.waitForTimeout(r23);
		}

		//----- Close the 'use the App' button
		const closeBtn = await page.$x('//*[@aria-label="Close"]');
		if (closeBtn) {
			await closeBtn[0].tap();
		}

		//---- Make New Post
		let postNew = await page.$x('//*[@aria-label="New Post"]');
		if (postNew) {
			const [fileChooser] = await Promise.all([page.waitForFileChooser(), postNew[0].tap()]);
			await fileChooser.accept([`${oldPath}`]);
			await page.waitForTimeout(2000);
			//---- resize image
			// let expandBtn = await page.$x('//span[contains(text(), "Expand")]');
			// if (expandBtn) {
			// 	await expandBtn[0].tap();
			// 	await page.waitForTimeout(2000);
			// }
			//---- Push Next button
			let nextBtn = await page.$x('//button[contains(text(), "Next")]');
			if (nextBtn) {
				await Promise.all([page.waitForNavigation(), await nextBtn[0].tap()]);
			}
			//---- Type the caption
			let textArea = await page.$x('//textarea[contains(text(), "Write a caption…")]');
			if (textArea) {
				let caption = `${fullCaption}`;
				await page.type('textarea', caption);
				await page.waitForTimeout(2000);
				await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), page.tap('button.UP43G')]);
			}
		}
		await fs.rename(oldPath, newPath, function (err) {
			if (err) throw err;
			console.log(`Moved file ${oldPath} into ${newPath}`);
		});
		//BACK AND CLOSE BROWSER
		await browser.close();
		process.exit(1);
	} catch (e) {
		console.log('error||||||||||||||>>>>>>>> ' + e);
		// process.exit(1);
	}
})();

/*-------click not now app
const appBtn = await page.$x('//*[@href="/"]');
if (appBtn.length > 0) {
await appBtn[0].tap();
console.log('tapped that Not Now button');
await page.waitForTimeout(r23)
else {
					let viewsBtn = await page.$x('//*[@aria-label="Like"]');
					await viewsBtn.tap();
				}
			await page.goto(currentURL + 'comments/', { waitUntil: 'networkidle0' });
			await page.waitForSelector('#react-root');
			await page.waitForTimeout(r(2000, 3000));
			let commentLikeBtn = await page.$x('//*[@aria-label="Like"]');
			if (commentLikeBtn.length > 0) {
				await commentLikeBtn[r(0, commentLikeBtn.length)].tap();
				await page.waitForTimeout(r(2000, 3000));
			}
*/
