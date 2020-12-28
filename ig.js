const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone X'];
const random10 = Math.floor(Math.random() * 10 + 1);

//console.log(random10) "3" ;
//console.log(random10 + 1) "4";

(async () => {
	try {
		const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
		const page = await browser.newPage();
		await page.emulate(iPhone);
		//LOGIN
		await page.goto('https://www.instagram.com/accounts/login/?source=auth_switcher', { waitUntil: 'load' });
		await page.waitForSelector('[name="username"]');
		await page.type("#loginForm input[name='username']", 'hb.iv', { delay: 20 });
		await page.type("#loginForm input[name='password']", 'Fabweld112358', { delay: 21 });
		await page.click("#loginForm button[type='submit']", { delay: 19 });
		await page.waitForTimeout(5000);

		//NOTIFICATIONS SCREEN
		const notifyBtns = await page.$x("//button[contains(text(), 'Not Now')]");
		if (notifyBtns.length > 0) {
			await notifyBtns[0].click();
		} else {
			console.log('no notifaction buttons to click');
		}

		//GOTO THE PAGE TO FARM FOLLOWERS
		await page.goto('https://www.instagram.com/explore/tags/pursebop', { waitUntil: 'networkidle2' });
		await page.waitForTimeout(2485);
		const random20 = Math.floor(Math.random() * 20 + 10);
		const newestPost = await page.$$('a[href^="/p/"]');
		await newestPost[random20].evaluate(clk => clk.click());

		//CLICK OTHERS LIST OF FOLLOWERS WHO LIKES IT
		await page.waitForTimeout(3122);
		const othersLink = await page.$x("//a[contains(text(), 'others')]");
		if (othersLink.length > 0) {
			await othersLink[0].click();
		} else {
			const backBTN = await page.$x("//svg[@aria-label='Back']");
			await backBTN[0].evaluate(backk => backk.click({ delay: 333 }));
			console.log('othersLink: not Found ', othersLink);
		}

		//GOTO RANDOM LINK 1-10
		await page.waitForTimeout(2855);
		const followers = await page.$$('a[title]');
		if (followers.length > 0) {
			await followers[random10].click();
		} else {
			console.log('followers not found ', followers);
		}

		//LIKE RANDOM 1-3 PHOTO
		await page.waitForTimeout(3322);
		const isPrivate = await page.$x("//div[contains(text(), 'Follow to see their photos and videos.')]");
		const backBtn = await page.$x("//svg[@aria-label='Back']");
		console.log('isPrivate.length', isPrivate.length);

		if (isPrivate.length === 0) {
			console.log('isPrivate === 0');
			const random3 = Math.floor(Math.random() * 3 + 1);
			const posts = await page.$x('//a[starts-with(@href, "/p/")]');
			await posts[random3].evaluate(cl => cl.click());
			await page.waitForTimeout(3145);
			//GOTO FOLLOERS PHOTO PAGE
			await page.waitForSelector('svg[aria-label="Like"]');
			const likeBtn = await page.$('svg[aria-label="Like"]');
			console.log('likeBtn.length: ', likeBtn.length);
			await likeBtn.evaluate(clck => clck.click());
			console.log('We hit that like button!');
			await browser.close();
			process.exit(1);
		} else {
			console.log('This Account is Private');
			await backBtn[0].evaluate(c => c.click());
		}

		console.log('pastthe last if statement');
		/*//TRY THIS for the optional btns screen
		const notifyBtns = await page.$x('//button[contains(text), "Not Now")]');
		if (notifyBtns.length > 0) {
			await notifyBtns[0].click();
		} else {
			console.log('no notifaction button today');
		}

		//await browser.close();
		process.exit(1);*/
	} catch (e) {
		console.log('ERROR:-> ', e);
		//process.exit(1);
	}
})();
