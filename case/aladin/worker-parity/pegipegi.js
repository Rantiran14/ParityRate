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

    const link = 'https://www.pegipegi.com/'
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
    });

    const page = await browser.newPage();
    await page.goto(link, {waitUntil: 'networkidle2'});

    // input hotel name
    // await page.waitForSelector('#hotelTab > div.indexFo> input.textSelect');

    await page.waitForSelector('#hotelNameKey')
    await page.click('#hotelNameKey')
    await page.type('#hotelNameKey','ayana midplaza jakarta');

    await page.waitForSelector('#formSearchHotel > div > div > div.formLine > div > ul > li > div:nth-child(1) > span');
    await page.waitForTimeout(7000)
    await page.click('#formSearchHotel > div > div > div.formLine > div > ul > li > div:nth-child(1) > span');

    // search
    await page.waitForSelector('#formSearchHotel > div > div > div:nth-child(6) > div.twoColumn > div.right > button');
    await page.click('#formSearchHotel > div > div > div:nth-child(6) > div.twoColumn > div.right > button');

    await page.waitForTimeout(5000);
    const url = page.url()
    // console.log(page.url());
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
    console.log('replaced link:', replaced)
    // await this.getPriceHotel(hotel_name, linkurl, checkin, checkout, stay)

    const browser2 = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
      });

    const page2 = await browser2.newPage();
    await page2.goto(replaced, {waitUntil: 'networkidle2'});
    
    ///type room
    await page2.waitForSelector('div.listContentRoom > div.right > div.contentLeft > div.title')
    
    let element = await page2.$('div.listContentRoom > div.right > div.contentLeft > div.title')
    let value = await page2.evaluate(el => el.textContent, element)
    console.log(value)

    //price
    await page2.waitForSelector('div.listContentRoom > div.right > div.contentRight > div.contentPrice > div.normalPrice')
    let element2 = await page2.$('div.listContentRoom > div.right > div.contentRight > div.contentPrice > div.normalPrice')
    let value2 = await page2.evaluate(el => el.textContent, element2)
    console.log(value2)

    //breakfast
    await page2.waitForSelector('div.listContentRoom > div.right > div.contentLeft > div:nth-child(3) > span')
    let element3 = await page2.$('div.listContentRoom > div.right > div.contentLeft > div:nth-child(3) > span')
    let value3 = await page2.evaluate(el =>  el.textContent, element3)
    if (value3 === 'Termasuk Sarapan' || 'Sarapan'){
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
    
    await page2.close();
    await browser2.close();
}
dateHotel()
