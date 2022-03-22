//const I = actor();
//const puppeteer = require('puppeteer');
//const config = require('../../config');
//const MyCustomHelper = require('../helpers/a11yHelper');
//
//const page = null;
//const helperClass = new MyCustomHelper();
//
//module.exports = {
//  fields: {
//    email: '#username',
//    password: '#password',
//    submit: 'input[type="submit"]'
//  },
//  async goToSignInPage() {
//    I.amOnPage('https://manage-case.aat.platform.hmcts.net/cases');
//
//    // I.waitFor(1000);
//    // I.click('codecept_training_material');
//    // await helperClass.getCurrentUrl();
//
//    console.log(`cool ${await helperClass.getCurrentUrl()}`);
//
//    // I.getCurrentUrl().then(function (result) {
//    // console.log(result);
//    // });
//    // await browser.get(serviceConfig.CcdWebUrl + '/');
//
//    //  const browser = await puppeteer.launch({headless: true});
//    //  const page = await browser.newPage();
//    //  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//    //  await page.pdf({path: 'hn.pdf', format: 'A4'});
//    // other actions...
//    // await browser1.close();
//
//    /* const browser = await puppeteer.launch({
//          headless:false,
//          slowMo:100
//        })*/
//    const urlForCaes = config.baseUrl;
//    // page = await browser.newPage()
//    // await page.goto("http://google.com");
//    //  await page.waitFor(5000);
//    // const title = await page.title();
//    //   const url = await page.url();
//
//    // console.log("Page Title : "+title);
//    // console.log("Page URL : "+url);
//
//    // await page.waitFor(5000);
//    // await page.close();
//  },
//
//  async signInAsCaseWorker() {
//    await page.type(this.fields.email, config.legalProfessionalUserOne.email);
//    await page.type(this.fields.password, config.legalProfessionalUserOne.password);
//    await Promise.all([
//      page.waitForNavigation(),
//      page.click(this.fields.submit)
//    ]);
//
//    console.log(`Page Title after signin : ${title}`);
//    console.log(`Page URL after signin: ${url}`);
//
//    await page.waitFor(5000);
//    await page.close();
//  }
//};