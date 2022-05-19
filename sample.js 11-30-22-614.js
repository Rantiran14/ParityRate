const json2csv = require('json2csv');
const fs = require('fs');
const moment = require('moment');
const prompt = require('prompt');
var XLSX = require('xlsx');
var workbook = XLSX.readFile('storage/import/urlparity.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// const midtrans_failure_email = require('./case/configuration/midtrans_failure_email');
// let scrapedData = [];
// (async () => {
let scrapedData = [];
module.exports = {
    async hotelLink() {
        for (let index = 0; index < xlData.length; index++) {
            const linkk = xlData[index].Traveloka;
            this.getLinkHotel(linkk);
            console.log(linkk)
        }

        const ws = XLSX.utils.json_to_sheet(scrapedData)

        XLSX.utils.book_append_sheet(workbook,ws,"Traveloka")

        // Writing to our file
        XLSX.writeFile(workbook,'storage/export/travelokalink.xlsx');
        },
        async getLinkHotel(linkk){
            console.log("link: ", linkk)
        
        const link = (linkk+CheckIn+'.'+CheckOut+'.'+Guest+'.'+Stay)
        const split1 = link.split("-")
        // console.log(split1)
        const split2 = split1[2].split("?")
        // console.log(split2[0])
        const id = split2[0]
        const split3 = split1[0].split("/")
        // console.log(split3)
        // const hotel = split3[5]
        const link2 = ('http://www.traveloka.com/hotel/indonesia/akasa-hotel-3000010004391?spec='+CheckIn+'.'+CheckOut+'.'+Guest+'.'+Stay+'HOTEL'+'.'+id+'.'+split3[5])
        console.log(link2)

        // Writing to our file
        XLSX.writeFile('storage/export/linkurl.xlsx')
    
        },
        async dateHotel() {
        let arr = [];
         global.BROWSER_COLLECTION = ['chrome']

         let param = ''
         if (process.argv.length >= 3) {
          param = process.argv[2]
         }
        let schema = {
            properties: {
            checkin: {
                format: 'date',
                message: 'Date must be required as format (YYYY-MM-DD)',
                required: true
            },
            checkout: {
                format: 'date',
                message: 'Date must be required as format (YYYY-MM-DD)',
                required: true
            },
            guest: {
                format: 'number',
                message: 'Guest must be required as number',
                required: true
            }
            }
        };

    prompt.start();

    prompt.get(schema, function (err, result) {
    if (err) { return onErr(err); }
        console.log('  Checkin Date: ' + result.checkin);
        console.log('  Checkout Date: ' + result.checkout);
        // console.log('   Guest: ' + result.guest)
        const date1 = result.checkin;
        const CheckIn = date1.split("-").reverse().join("-");
        // console.log(CheckIn)
        const date2 = result.checkout;
        const CheckOut = date2.split("-").reverse().join("-")
        const Guest = result.guest;
        const d1 = (new Date(CheckIn)).getDate();
        const d2 = (new Date(CheckOut)).getDate();
        const Stay  = d2-d1
        },
        function onErr(err) {
            console.log(err);
            return 1;
        }
    )}
}
    // console.log("======= Aladin Hotel Parity Result =======");
    // if (param == '' || param == 'parity') {
        // const caseHotel = require('./case/aladin/hotel-parity/tiket-hotel');
        // const { hotelCase } = require('./case/aladin/hotel-parity/tiket-hotel');
        // await caseHotel.hotelCase();

        // const caseHotel = require('./case/aladin/hotel-parity/traveloka-hotel');
        // const { hotelCase } = require('./case/aladin/hotel-parity/traveloka-hotel');
        // await caseHotel.hotelCase();

        // const caseHotel = require('./case/aladin/hotel-parity/aladin-hotel');
        // const { hotelCase } = require('./case/aladin/hotel-parity/aladin-hotel');
        // await caseHotel.hotelCase();

        // const caseHotel = require('./case/aladin/hotel-parity/agoda-hotel');
        // const { hotelCase } = require('./case/aladin/hotel-parity/agoda-hotel');
        // await caseHotel.hotelCase();

        // const caseHotel = require('./case/aladin/hotel-parity/pegipegi-hotel');
        // const { hotelCase } = require('./case/aladin/hotel-parity/pegipegi-hotel');
        // await caseHotel.hotelCase();

    // }

    // let temp_result = []
    // let fields = ['TestName', 'TestMenu', 'TestResult', 'BrowserName'];
    // for (let i in arr) {
    //     // let obj = arr[i];
    //     console.log(arr[i])
    //     console.log(' ')
    //     // console.log("Test Name : " + obj.TestName); 
    //     // console.log("Result Is : " + obj.TestResult);
    //     // console.log("===========================");
    //     // console.log(" ");

    //     for (let j in arr[i]) {
    //         temp_result.push({
    //             TestName: arr[i][j].TestName,
    //             TestMenu: arr[i][j].TestMenu,
    //             TestResult: arr[i][j].TestResult,
    //             BrowserName: arr[i][j].BrowserName,
    //         })
    //         // assert.equal(arr[i][j].TestResult,'Pass');

    //     }
    // }

//     let csv = json2csv({ data: temp_result, fields: fields });
//     let dateTime = new Date();
//     let current_date = moment(dateTime).format("YYYYMMDDHHmmss");
//     fs.writeFile("result/" + current_date + '.csv', csv, function (err) {
//         if (err) throw err;
//         // console.log('file saved');
//     });


// // )().catch((ex) => {
// //     console.log(ex);
// })
// }  