<h1 align="center">Instagram Automation with Puppeter🚀</h1>

<p align="center">
    <img src="https://img.shields.io/github/repo-size/hugh-bowie/puppeteer-ig-bot" />
    <img src="https://img.shields.io/github/languages/top/hugh-bowie/puppeteer-ig-bot"  />
    <img src="https://img.shields.io/github/issues/hugh-bowie/puppeteer-ig-bot" />
    <img src="https://img.shields.io/github/last-commit/hugh-bowie/puppeteer-ig-bot" >

</p>
<p align="center">
<img src="https://img.shields.io/badge/Puppeteer-99ff99"  />
    <img src="https://img.shields.io/badge/Node_Schedule-orange" />
    <img src="https://img.shields.io/badge/puppeteer_extra-99ccff"  />
    <img src="https://img.shields.io/badge/puppeteer_extra_stealth-ff4d4d"  />
</p>

## 📓 Description

This application automates instagram engagement without use of the restrictive instagram/fb API by using the Puppeteer Library.<br>
To avoid instagrams robust bot-detection the app uses the [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) plugin, as well human-like browsing with randomly generated pauses.<br>
1. The app will login to your existing account (set your credentials in .env file locally) and log your profiles follower/following count.
2. The app will navigate to a randomly selcted page from the short list of accounts you provide with the demographic you need in "/src/accountList.js".
3. From that starting account the app will find a random post to make a list of <b>public users with active stories</b> who liked it.
4. Using that list the app will then engage (View story, Like one photo and leave a comment) for each user account in a loop until finished.
You decide how many accounts you wish to engage (under 25 per hour is best practice to avoid detection).<br>
The app will then view the story, like and comment on a randomly selected photo of each user from that demographic.<br>
You may schedule this app to run as often as youd like using the node-schedule package by adjusting the file "schedule.js".<br>
Test the stealth before each run using this site. [https://bot.sannysoft.com/](https://bot.sannysoft.com/).<br>

## 🎬 Screenshot

![Puppeteer-ig-bot](./assets/onlyDwight.gif)

## 📋 Table of Contents

- [Description](#description)
- [Screenshot](#Screenshot)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)

## 🛠 Installation

`npm install dotenv node-schedule puppeteer puppeteer-extra puppeteer-extra-plugin-stealth`

## ▶️ Useage

You must give this Bot Accounts to engage with. Add them or remove them to the
targetAccounts.js Array.

`node ig.js`

## 🍻 Contributing

:octocat: [Hugh Bowie](https://github.com/hugh-bowie)

## ⁉️ Questions

Contact me with any questions:
[hughbowie@me.com](mailto:hughbowie@me.com)<br />[GitHub](https://github.com/hugh-bowie)<br />
