let fs = require('fs');

if(process.argv.length < 3){
    console.log("Parameter should be 3");
    return;
}

let args = process.argv[2];

if(!fs.existsSync(args)){
    console.log("File " + args + "is not exist");
    return;
}

global.BROWSER_COLLECTION = ['firefox'];
let apps = require(args);
apps();