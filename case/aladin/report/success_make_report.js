var assert = require('assert')
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until
const sign_in = By.className('header__top__act--txt');
var chromeCapabilities = webdriver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
var chromeOptions = {
    'args': ['--test-type', '--start-maximized', '--disable-infobars']
};
chromeCapabilities.set('chromeOptions', chromeOptions);

const data_registration = [{
    email: "robby@nebulae.be",
    password: "password123",
    phone: "+12345678909",
    text: "adxgshdhewiudgiuyewgdueyuwydfeuwyfdu",
},
];

module.exports = () => {
    return new Promise((resolve, reject) => {
        (async () => {
            let testCase = []

            for (let i = 0; i < BROWSER_COLLECTION.length; i++) {

                let tc = {
                    TestName: "Success Make Report Iflag",
                    TestMenu: "report",
                    TestResult: "Fail",
                    BrowserName: BROWSER_COLLECTION[i]
                };

                let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).forBrowser(BROWSER_COLLECTION[i]).build()
                driver.manage().window().maximize();

                driver.get('https://app-dev.iflag.be/#/nebulae');

                
                // scroll = By.css('#root > div > div:nth-child(2) > div:nth-child(1) > button > span.MuiButton-label');
                // await driver.executeScript("window.scrollBy(0,200)", scroll);

                driver.sleep(3000);
                
                //make report
                rep = By.className('MuiButton-label');
                await driver.wait(until.elementLocated(rep));
                await driver.findElement(rep).click();

                //continue network
                await driver.findElement(By.css('body > div.MuiDialog-root.dialog-report > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogActions-root.MuiDialogActions-spacing > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.button.button--primary > span.MuiButton-label')).click();

                // driver.sleep(3000);
                tnc = By.css('#root > div > div.report-content > div.card > div > div > fieldset > label > span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1');
                await driver.wait(until.elementLocated(tnc));
                await driver.findElement(tnc).click();
                
                next = By.css('#root > div > div.report-content > div.card > div > button');
                await driver.findElement(next).click();

                next2 = By.css('#root > div > div.report-content > div.card > div > button');
                await driver.findElement(next2).click();


                tnc2 = By.className('MuiTypography-root MuiFormControlLabel-label MuiTypography-body1');
                await driver.wait(until.elementLocated(tnc2));
                await driver.findElement(tnc2).click();

                await driver.findElement(By.css('#root > div > div.report-content > div.card > div > button > span.MuiButton-label')).click();

                driver.sleep(2000);
                type_report = By.className('MuiButtonBase-root MuiTab-root reportTypeTab1 MuiTab-textColorInherit tab-button MuiTab-fullWidth');
                await driver.wait(until.elementLocated(type_report));
                await driver.findElement(type_report).click();

                next3 = By.className('MuiButtonBase-root MuiButton-root MuiButton-text button button--primary submit');
                await driver.executeScript("window.scrollBy(0,200)", next3);
                driver.sleep(2000)
                await driver.findElement(next3).click();

                //type1 anonymous
                type_anonymous = By.className('MuiTypography-root MuiFormControlLabel-label MuiTypography-body1');
                await driver.wait(until.elementLocated(type_anonymous));
                await driver.findElement(type_anonymous).click();

                next4 = By.css('#root > div > div.report-content > div.card > div > button');
                await driver.findElement(next4).click();

                email = By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(1) > div.text-field-input > div > div > input');
                await driver.wait(until.elementLocated(email));
                await driver.findElement(email).sendKeys(data_registration[0].email);

                phone = By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(2) > div.text-field-input > div > div > input');
                await driver.findElement(phone).sendKeys(data_registration[0].phone);

                //none
                option = By.className('MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input');
                await driver.findElement(option).click();
                await driver.findElement(By.css('#menu- > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.Mui-selected.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button.Mui-selected')).click();

                //harassment
                await driver.findElement(By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(1) > div.MuiFormControl-root.checkbox-group > label:nth-child(2) > span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1')).click();

                //corruption
                await driver.findElement(By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(1) > div.MuiFormControl-root.checkbox-group > label:nth-child(3) > span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1')).click();
                
                //discrimination
                await driver.findElement(By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(1) > div.MuiFormControl-root.checkbox-group > label:nth-child(4) > span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1')).click();      
                
                 //theft
                await driver.findElement(By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(1) > div.MuiFormControl-root.checkbox-group > label:nth-child(5) > span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1')).click();

                //violation
                await driver.findElement(By.css('#root > div > div.report-content > div.card > div > div > div:nth-child(1) > div.MuiFormControl-root.checkbox-group > label:nth-child(6) > span.MuiTypography-root.MuiFormControlLabel-label.MuiTypography-body1')).click();         
                
                driver.sleep(2000)
                next5 = By.css('//*[@id="root"]/div/div[2]/div[2]/div/button');
                // await driver.wait(until.elementLocated(next5))
                await driver.findElement(next5).click();

                // next5 = By.css('#root > div > div.report-content > div.card > div > button');
                // await driver.findElement(next5).click();

                textrep = By.css('#root > div > div.report-content > div.card > div > div.input-wrapper > div.input > div > div > div > textarea:nth-child(1)');
                await driver.wait(until.elementLocated(textrep));
                await driver.findElement(textrep).sendKeys(data_registration[0].text);
                
                reg_report = By.css('#root > div > div.report-content > div.card > div > button > span.MuiButton-label');
                await driver.findElement(reg_report).click();

                let success_message = "Report registered"
                const mes = By.css('#root > div > div.report-content > div.card > div > h1');
                // console.log(success_message);
                let get_success_message = await driver.findElement(mes).getText();
                console.log(get_success_message);
                console.log(success_message);
                if (success_message == get_success_message)
                    tc.TestResult = "Pass"

                // driver.quit();
                console.log(mes);

                testCase.push(tc)
            }

            resolve(testCase);

        })().catch((ex) => {
            console.log(ex);
        })
    })
}