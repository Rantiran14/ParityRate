const puppeteer = require('puppeteer');
const { Driver } = require('selenium-webdriver/chrome');


async function getUrl() {
    const link = 'https://www.tiket.com/hotel'
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
    });

    const page = await browser.newPage();
    await page.goto(link, {waitUntil: 'networkidle2'});

    // input hotel name
    await page.waitForSelector('#destination-input');
    await page.click('#destination-input');
    await page.type('#destination-input','ayana midplaza jakarta');

    await page.waitForSelector('#autocomplete-list-item > div.main-container > div > div.name');
    await page.waitForTimeout(7000)
    await page.click('#autocomplete-list-item > div.main-container > div > div.name');

    await page.waitForSelector('#date-input-startdate')
    await page.$eval('#date-input-startdate', el => el.value = 'Sel, 10 Mei 2022');

    await page.waitForSelector('#date-input-enddate')
    await page.$eval('#date-input-enddate', el => el.value = 'Rab, 11 Mei 2022');

    await page.waitForSelector('#guestAndRoom > div > div > div > div > div.done-button > button');
    await page.click('#guestAndRoom > div > div > div > div > div.done-button > button');

    await page.waitForSelector('#app > main > div > div.hero-section > div.widget-container > div > div.button-container > button');
    await page.click('#app > main > div > div.hero-section > div.widget-container > div > div.button-container > button');

    await page.waitForSelector('body > div.ab-iam-root.v3.ab-animate-in.ab-animate-out.ab-effect-modal.ab-show > div.ab-in-app-message.ab-background.ab-modal-interactions.ab-modal.ab-centered > div.ab-message-buttons > button:nth-child(2)');
    await page.waitForTimeout(5000);
    await page.click('body > div.ab-iam-root.v3.ab-animate-in.ab-animate-out.ab-effect-modal.ab-show > div.ab-in-app-message.ab-background.ab-modal-interactions.ab-modal.ab-centered > div.ab-message-buttons > button:nth-child(2)');

    await page.waitForTimeout(5000);
    console.log(page.url());
}
getUrl();