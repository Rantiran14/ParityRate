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

    const link = 'https://www.agoda.com/id-id/'
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
    });

    const page = await browser.newPage();
    // await page.goto(link, {waitUntil: 'networkidle2'});
    await page.goto(link, { waitUntil: 'domcontentloaded' })

    // pop up
    await page.waitForSelector('body > div.ab-iam-root.v3.ab-animate-in.ab-animate-out.ab-effect-modal.ab-show > div.ab-in-app-message.ab-background.ab-modal-interactions.ab-modal.ab-centered > div.ab-message-buttons > button:nth-child(2)');
    await page.click('body > div.ab-iam-root.v3.ab-animate-in.ab-animate-out.ab-effect-modal.ab-show > div.ab-in-app-message.ab-background.ab-modal-interactions.ab-modal.ab-centered > div.ab-message-buttons > button:nth-child(2)')

    // input hotel name
    await page.waitForSelector('div.IconBox.IconBox--autocomplete > div > div > input');
    await page.click('div.IconBox.IconBox--autocomplete > div > div > input');
    await page.type('div.IconBox.IconBox--autocomplete > div > div > input','jw marriott hotel jakarta');

    // select hotel
    await page.waitForSelector('div.Popup__container.Popup__container--garage-door > div > div > ul > li');
    await page.waitForTimeout(5000)
    await page.click('div.Popup__container.Popup__container--garage-door > div > div > ul > li');

    await page.waitForSelector('div.IconBox.IconBox--occupancy');
    await page.click('div.IconBox.IconBox--occupancy');

    // pasangan
    await page.waitForTimeout(5000)
    // await page.waitForSelector('div.Popup__container.Popup__container--garage-door > div > div > div > div > div > div.TravellerSegment.TravellerSegment--active > div.TravellerSegment__row.TravellerSegment__title')
    // await page.click('div.Popup__container.Popup__container--garage-door > div > div > div > div > div > div.TravellerSegment.TravellerSegment--active > div.TravellerSegment__row.TravellerSegment__title')

    await page.waitForSelector('#SearchBoxContainer > div.Box-sc-kv6pi1-0.hRUYUu.TabContent__Search--button > button');
    await page.waitForTimeout(5000);
    await page.click('#SearchBoxContainer > div.Box-sc-kv6pi1-0.hRUYUu.TabContent__Search--button > button')
    // const button = await page.$('//*[@id="SearchBoxContainer"]/div[2]/button')
    // await button[0].click() 
    
    // await page.waitForSelector('#contentContainer > div:nth-child(4) > ol > li:nth-child(1) > div.Box-sc-kv6pi1-0.edeiva.JacketContent.JacketContent--SelectedProperty > a')
    // await page.click('#contentContainer > div:nth-child(4) > ol > li:nth-child(1) > div.Box-sc-kv6pi1-0.edeiva.JacketContent.JacketContent--SelectedProperty > a')
    await page.waitForTimeout(20000)
    const hrefs = await page.$$eval("a.PropertyCard__Link", (list) => list.map((elm) => elm.href));
    console.log("href : ", hrefs[0]);

    // await page.waitForTimeout(10000);
    // const url = page.url()
    // console.log(page.url());
    await page.close();
    await browser.close();

    const CheckIn = "2022-05-10"
    const CheckOut = "2022-05-11"
    const Guest = "2"
    const d1 = (new Date(CheckIn)).getDate();
    const d2 = (new Date(CheckOut)).getDate();
    const Stay = d2 - d1

    const link2 = hrefs[0]
    console.log(link2)
    // let params = queryParam.split(".");
    let hotel = link2.split("/")
    let hotel2 = hotel[4].split("_")
    // console.log(hotel2)
    let hotel3 = hotel2[0].split("-")
    const hotelname =`${hotel3[0]} ${hotel3[1]} ${hotel3[2]}`
    console.log('Hotel Name : ', hotelname);

    const url2 = new URL(link2)
    const checkin = getParameterByName('checkIn', url2);
    const rep_checkin = link2.replace(checkin, CheckIn);

    const stay = getParameterByName('los', url2);
    const rep_stay = rep_checkin.replace(stay, Stay);

    const guest = getParameterByName('adults', url2);
    const replaced = rep_stay.replace(guest, Guest);

    console.log('link:', link2)
    console.log('replaced link:', replaced)

    // const hotel_name = hotelname;
    // const linkurl = replaced;
    // const check_in = CheckIn;
    // const check_out = CheckOut;
    // const stay2 = Stay;
    // await this.getPriceHotel(hotel_name, linkurl, checkin, checkout, stay)
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

    const browser2 = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
      });

    const page2 = await browser2.newPage();
    // await page2.goto(linkurl, {waitUntil: 'networkidle2'});
    await page2.goto(replaced, { waitUntil: 'domcontentloaded' })

    // const page2 = (await browser.pages())[1];

    //type room
    await page2.waitForSelector('#roomGridContent > div.MasterRoom.MasterRoom--withMoreLess > div.MasterRoom-header > div.MasterRoom-headerLeft > div > div > div:nth-child(1) > span.MasterRoom__HotelName')
    
    await page2.waitForTimeout(5000)
    let element = await page2.$('#roomGridContent > div.MasterRoom.MasterRoom--withMoreLess > div.MasterRoom-header > div.MasterRoom-headerLeft > div > div > div:nth-child(1) > span.MasterRoom__HotelName')
    let value = await page2.evaluate(el => el.textContent, element)
    console.log(value)

    //price
    await page2.waitForSelector('div.ChildRoomsList-room.ChildRoomsList-room--highlighted > div > div.ChildRoomsList-roomCell.ChildRoomsList-roomCell-price.relativeCell > div > div.PriceContainer-Top > div > div.PriceContainer > div:nth-child(2) > div > h1 > span.pd-price.PriceDisplay > strong')
    let element2 = await page2.$('div.ChildRoomsList-room.ChildRoomsList-room--highlighted > div > div.ChildRoomsList-roomCell.ChildRoomsList-roomCell-price.relativeCell > div > div.PriceContainer-Top > div > div.PriceContainer > div:nth-child(2) > div > h1 > span.pd-price.PriceDisplay > strong')
    let value2 = await page2.evaluate(el => el.textContent, element2)
    console.log(value2)

    //breakfast
    await page2.waitForSelector('div.ChildRoomsList-roomCell.ChildRoomsList-roomCell-featureBuckets > div > div > div:nth-child(2) > div > div > span > span > span.Spanstyled__SpanStyled-sc-16tp9kb-0.AeAps.kite-js-Span')
    let element3 = await page2.$('div.ChildRoomsList-room > div > div.ChildRoomsList-roomCell.ChildRoomsList-roomCell-featureBuckets > div > div.ChildRoomsList-room-featurebucket.ChildRoomsList-room-featurebucket-Benefits > div:nth-child(2) > div > div > span > span')
    let value3 = await page2.evaluate(el =>  el.textContent, element3)
    if (value3 === 'Sarapan untuk 2 orang - Rp 570.000Termasuk' || null ){
      value3 = '1'
    }else{
      value3 = '0'
    }
    console.log(value3)

    await page2.close();
    await browser2.close();

    // scrapedData.push(data);
    
}
dateHotel()
