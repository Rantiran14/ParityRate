const json2csv = require('json2csv');
const fs = require('fs');
const moment = require('moment');
const prompt = require('prompt');
var XLSX = require('xlsx');
const { getLinkHotel } = require('./sample.js 11-30-22-614');
const { Page } = require('puppeteer');
var workbook = XLSX.readFile('storage/import/parityurl.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
var wb =  XLSX.utils.book_new();

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
    //     if (err) { return onErr(err); }
    //     console.log('  Checkin Date: ' + result.checkin);
    //     console.log('  Checkout Date: ' + result.checkout);
    //     // console.log('   Guest: ' + result.guest)
    //     const date1 = result.checkin;
    //     const CheckIn = date1.split("-").join("-");
    //     // console.log(CheckIn)
    //     const date2 = result.checkout;
    //     const CheckOut = date2.split("-").join("-")
    //     const Guest = result.guest;
    //     console.log('Guest: ',Guest)
    //     const d1 = (new Date(date1)).getDate();
    //     const d2 = (new Date(date2)).getDate();
    //     const Stay = d2 - d1
    //     // console.log("stay :", Stay)

            const CheckIn = "2022-05-10"
            const CheckOut = "2022-05-11"
            const Guest = "2"
            const d1 = (new Date(CheckIn)).getDate();
            const d2 = (new Date(CheckOut)).getDate();
            const Stay = d2 - d1

            const link = 'https://www.agoda.com/the-langham-jakarta/hotel/jakarta-id.html?finalPriceView=1&isShowMobileAppPrice=false&cid=1844104&numberOfBedrooms=&familyMode=false&adults=2&children=0&rooms=1&maxRooms=0&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=IDR&isFreeOccSearch=false&isCityHaveAsq=false&los=3&searchrequestid=c1c8a51c-b32b-45f9-9121-c82e22454fa1&checkin=2021-11-26'

            // let params = queryParam.split(".");
            let hotel = link.split("?")
            let hotel2 = hotel[0].split("/")
            let hotel3 = hotel2[3].split("-")
            const hotelname =`${hotel3[0]} ${hotel3[1]} ${hotel3[2]}`
            console.log('Hotel Name : ', hotelname);
            // console.log('Params 2 : ', params[1]);
            // console.log('Params3: ', params[2])
            // console.log('Params4: ', params[3])

            const url = new URL(link)
            const checkin = getParameterByName('checkin', url);
            const rep_checkin = link.replace(checkin, CheckIn);

            const stay = getParameterByName('los', url);
            const rep_stay = rep_checkin.replace(stay, Stay);

            const guest = getParameterByName('adults', url);
            const replaced = rep_stay.replace(guest, Guest);
        
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
        wb.SheetNames.push('agoda')
        let ws = XLSX.utils.json_to_sheet(scrapedData)
        wb.Sheets['agoda'] = ws
        // XLSX.utils.json_to_sheet(wb,ws,'traveloka')
        // Writing to our file
        XLSX.writeFile(wb,'storage/export/link-agoda.xlsx')

        const caseHotel = require('./case/aladin/hotel-parity/agoda-hotel');
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

      