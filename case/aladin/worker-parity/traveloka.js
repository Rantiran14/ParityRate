const puppeteer = require('puppeteer');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down');
const { Driver } = require('selenium-webdriver/chrome');

let scrapedData = [];
async function dateHotel() {
    let arr = [];
    global.BROWSER_COLLECTION = ['chrome']

    let param = ''
    if (process.argv.length >= 3) {
        param = process.argv[2]
    }

    const link = 'https://www.traveloka.com/id-id/hotel/'
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
    });

    const page = await browser.newPage();
    await page.goto(link, {waitUntil: 'domcontentloaded'});

    // input hotel name
    await page.waitForXPath('(.//*[normalize-space(text()) and normalize-space(.)="Search Hotels"])[1]/following::img[1]');
    const button = page.$x('(.//*[normalize-space(text()) and normalize-space(.)="Search Hotels"])[1]/following::img[1]')
    button.click()
    // await page.type('div.css-1dbjc4n.r-1jgb5lz.r-xiad99.r-16k0tzm:nth-child(5) div.css-1dbjc4n div.css-1dbjc4n.r-kdyh1x.r-1yos0t3.r-bztko3.r-184en5c:nth-child(1) div.css-1dbjc4n.r-kdyh1x.r-pezta div.css-1dbjc4n.r-6koalj.r-18u37iz div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-zm1pxt:nth-child(3) div.css-1dbjc4n:nth-child(2) div.css-1dbjc4n div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-69vrnd:nth-child(5) div.css-1dbjc4n.r-1e081e0.r-1ux73yq.r-tqpus0:nth-child(2) > div.css-18t94o4.css-1dbjc4n.r-kdyh1x.r-1loqt21.r-eu3ka.r-10paoce.r-1e081e0.r-5njf8e.r-1otgn73.r-lrvibr', 'Ayana midplaza jakarta')

    await page.click('#__next > div:nth-child(5) > div > div > div.css-1dbjc4n.r-nsbfu8 > div > div:nth-child(1) > div.css-1dbjc4n.r-1loqt21 > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1777fci.r-edyy15 > input');
    await page.type('#__next > div:nth-child(5) > div > div > div.css-1dbjc4n.r-nsbfu8 > div > div:nth-child(1) > div.css-1dbjc4n.r-1loqt21 > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1777fci.r-edyy15 > input','ayana midplaza jakarta');

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
    const url = page.url()
    console.log(page.url());
    await page.close();
    await browser.close();

    const CheckIn = "2022-05-10"
    const CheckOut = "2022-05-11"
    const Guest = "2"
    const d1 = (new Date(CheckIn)).getDate();
    const d2 = (new Date(CheckOut)).getDate();
    const Stay = d2 - d1

    const link2 = url
    let hotel = link2.split("?")
    let hotel2 = hotel[0].split("/")
    let hotel3 = hotel2[5].split("-")
    const hotelname =`${hotel3[0]} ${hotel3[1]} ${hotel3[2]}`
    console.log('Hotel Name : ', hotelname);

    const url2 = new URL(link2)
    const baseUrl = `${url2.origin}${url2.pathname}`
    const spec = `${'checkin='}${CheckIn}&${'checkout='}${CheckOut}&${'adult='}${Guest}&${'room=1'}`;
    // console.log('spec: ',spec)
    const replaced = `${baseUrl}?${spec}`;
    console.log('link:', url2, replaced)
    // await this.getPriceHotel(hotel_name, linkurl, checkin, checkout, stay)

    const browser2 = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
      });

    const page2 = await browser2.newPage();
    await page2.goto(replaced, {waitUntil: 'networkidle2'});
    
    //type room
    await page2.waitForSelector('div.room-item > div.room-card-list > div:nth-child(1) > div.left-side > div.top-left > div.title-wrap > h3')
    
    let element = await page2.$('div.room-item > div.room-card-list > div:nth-child(1) > div.left-side > div.top-left > div.title-wrap > h3')
    let value = await page2.evaluate(el => el.textContent, element)
    console.log(value)

    //price
    await page2.waitForSelector('div.room-item > div.room-card-list > div:nth-child(1) > div.right-side > div.bottom-right > div.room-price > span')
    let element2 = await page2.$('div.room-item > div.room-card-list > div:nth-child(1) > div.right-side > div.bottom-right > div.room-price > span')
    let value2 = await page2.evaluate(el => el.textContent, element2)
    console.log(value2)

    //breakfast
    await page2.waitForSelector('div.room-item > div.room-card-list > div:nth-child(1) > div.left-side > div.top-left > div.room-important-info > div:nth-child(1) > span')
    let element3 = await page2.$('div.room-item > div.room-card-list > div:nth-child(1) > div.left-side > div.top-left > div.room-important-info > div:nth-child(1) > span')
    let value3 = await page2.evaluate(el =>  el.textContent, element3)
    if (value3 === 'Sarapan (2 pax)' || 'Sarapan'){
      value3 = '0'
    }else{
      value3 = '1'
    }
    console.log(value3)

    const data = {
        hotel_name : hotelname,
        linkurl : replaced,
        checkin : CheckIn,
        checkout : CheckOut,
        stay : Stay,
        typeRoom : value,
        price : value2,
        breakfast : value3,
    }
    scrapedData.push(data);
    
}
dateHotel()
