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

    const link = 'https://www.misteraladin.com/'
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
    });

    const page = await browser.newPage();
    await page.goto(link, {waitUntil: 'networkidle2'});

    // input hotel name
    // await page.waitForSelector('#hotelTab > div.indexFo> input.textSelect');

    await page.waitForSelector('#site-content > section.section-search > div > div > div > div > div.tab-list > ul > li:nth-child(3) > a')
    await page.click('#site-content > section.section-search > div > div > div > div > div.tab-list > ul > li:nth-child(3) > a')

    await page.waitForSelector('#input-hotel-search')
    await page.type('#input-hotel-search','ayana midplaza jakarta');

    await page.waitForSelector('#site-content > section.section-search > div > div > div.col-12.search-box > div > div.tab-content > div:nth-child(3) > div > div:nth-child(1) > div.search-result > div:nth-child(1)');
    // await page.waitForTimeout(7000)
    await page.click('#site-content > section.section-search > div > div > div.col-12.search-box > div > div.tab-content > div:nth-child(3) > div > div:nth-child(1) > div.search-result > div:nth-child(1)');

    // search
    await page.waitForSelector('#btn-search-hotel');
    await page.click('#btn-search-hotel');

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

    let hotel = url.split("?")
    let hotel2 = hotel[1].split("&")
    let hotel3 = hotel2[6].split("=")
    let hotel4 = hotel3[1].split("%20")
    const hotelname =`${hotel4[0]} ${hotel4[1]} ${hotel4[2]}`
    let keyword = hotel3[1];
    let hotelid = hotel2[0].split("=");
    let hotel_id =  hotelid[1];
    let lang = hotel2[1].split("=");
    let langid = lang[1];
        // console.log('params 1 : ', hotel4);
        // console.log('Params 2 : ', params[1]);
        // console.log('Params3: ', params[2])
        // console.log('Params4: ', params[3])

    const url2 = new URL(url)
    const baseUrl = `${url2.origin}${url2.pathname}`
    const spec = `${'hotel_id='}${hotel_id}&${"lang="}${langid}&${'check_in='}${CheckIn}&${'night='}${Stay}&${'occupancy='}${Guest}&${'room_quantity=1'}&${'keyword='}${keyword}`;
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
    await page2.waitForSelector('#__layout > div > main > section.section-hotel-room > div > div:nth-child(3) > div.col-8 > div.group-info > h3')
    
    let element = await page2.$('#__layout > div > main > section.section-hotel-room > div > div:nth-child(3) > div.col-8 > div.group-info > h3')
    let value = await page2.evaluate(el => el.textContent, element)
    console.log(value)

    //price
    await page2.waitForSelector('#__layout > div > main > section.section-hotel-room > div > div:nth-child(3) > div.col-8 > div.group-room > div > div:nth-child(1) > div.col-4.row-2 > div.price > div.current-price')
    let element2 = await page2.$('#__layout > div > main > section.section-hotel-room > div > div:nth-child(3) > div.col-8 > div.group-room > div > div:nth-child(1) > div.col-4.row-2 > div.price > div.current-price')
    let value2 = await page2.evaluate(el => el.textContent, element2)
    console.log(value2)

    // sarapan
    await page2.waitForXPath('//*[@id="__layout"]/div/main/section[3]/div/div[3]/div[2]/div[2]/div/div[1]/div[1]/div[2]')
    let element3 = await page2.$x('//*[@id="__layout"]/div/main/section[3]/div/div[3]/div[2]/div[2]/div/div[1]/div[1]/div[2]')
    let value3 = await page2.evaluate(el => el.textContent, element3)
    // console.log(value3)
    if (value3 === 'Termasuk Sarapan (2 pax)' || 'Tidak Termasuk Sarapan'){
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
