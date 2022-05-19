const json2csv = require('json2csv');
const fs = require('fs');
const moment = require('moment');
const prompt = require('prompt');
// var XLSX = require('xlsx');
const { getLinkHotel } = require('./sample.js 11-30-22-614');
const { Page } = require('puppeteer');
// var workbook = XLSX.readFile('storage/import/parityurl.xlsx');
// var sheet_name_list = workbook.SheetNames;
// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// var wb =  XLSX.utils.book_new();

let scrapedData = [];
async function dateHotel() {
    let arr = [];
    global.BROWSER_COLLECTION = ['chrome']

    let param = ''
    if (process.argv.length >= 3) {
        param = process.argv[2]
    }
    // let schema = {
    //     properties: {
    //         checkin: {
    //             format: 'date',
    //             message: 'Date must be required as format (YYYY-MM-DD)',
    //             required: true
    //         },
    //         checkout: {
    //             format: 'date',
    //             message: 'Date must be required as format (YYYY-MM-DD)',
    //             required: true
    //         },
    //         guest: {
    //             format: 'number',
    //             message: 'Guest must be required as number',
    //             required: true
    //         }
    //     }
    // };

    // function onErr(err) {
    //     console.log(err);
    //     return 1;
    // }
    // prompt.start();

    // prompt.get(schema, function (err, result) {
        // if (err) { return onErr(err); }
        // console.log('  Checkin Date: ' + result.checkin);
        // console.log('  Checkout Date: ' + result.checkout);
        // console.log('   Guest: ' + result.guest)
        // const date1 = result.checkin;
        const CheckIn = "2022-05-10"
        // console.log(CheckIn)
        // const date2 = result.checkout;
        const CheckOut = "2022-05-11"
        const Guest = "2"
        // console.log('Guest: ',Guest)
        const d1 = (new Date(CheckIn)).getDate();
        const d2 = (new Date(CheckOut)).getDate();
        const Stay = d2 - d1
        // console.log("stay :", Stay)
        const link = 'https://www.misteraladin.com/hotel/indonesia/jakarta/thamrin/hotel-indonesia-kempinski-jakarta?hotel_id=512&lang=id&check_in=2022-04-19&night=1&occupancy=2&room_quantity=1&keyword=Hotel%20Indonesia%20Kempinski%20Jakarta'

        // let params = queryParam.split(".");
        let hotel = link.split("?")
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

        const url = new URL(link)
        const baseUrl = `${url.origin}${url.pathname}`
        const spec = `${'hotel_id='}${hotel_id}&${"lang="}${langid}&${'check_in='}${CheckIn}&${'night='}${Stay}&${'occupancy='}${Guest}&${'room_quantity=1'}&${'keyword='}${keyword}`;
        console.log('spec: ',spec)
        const replaced = `${baseUrl}?${spec}`;
        console.log('link:', link, replaced)

        const data = {
            hotelname : hotelname,
            linkurl : replaced,
            checkin : CheckIn,
            checkout : CheckOut,
            stay : Stay,
        }

        scrapedData.push(data);

            
        // }
        // console.log("scraped data:", scrapedData)
        // wb.SheetNames.push('tiket')
        // let ws = XLSX.utils.json_to_sheet(scrapedData)
        // wb.Sheets['tiket'] = ws
        // // XLSX.utils.json_to_sheet(wb,ws,'traveloka')
        // // Writing to our file
        // XLSX.writeFile(wb,'storage/export/link-aladin.xlsx')

        const caseHotel = require('./case/aladin/hotel-parity/aladin-hotel');
        caseHotel.hotelCase()
       
    // })

}
    
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),



        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
dateHotel()

      