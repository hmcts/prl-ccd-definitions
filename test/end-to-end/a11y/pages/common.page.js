const assert = require('assert')
const config = require('../../config');
const AxeRunner = require('../helpers/axe-runner');

const CustomHelper = require('../helpers/customHelper');

const I = actor();
let customHelper = new CustomHelper();

module.exports = {
    async goto() {
        const puppeteer = await customHelper.getPup();
        const browser = await puppeteer.launch();
        const page = await browser.newPage()
        await page.goto('https://soundcloud.com/')
        await page.hover('.playableTile__artwork')
        await page.screenshot({ path: 'hover.png' })
        await browser.close()
        // I.amOnPage('http://todomvc.com/examples/angularjs/#/')
        // I.refreshPage()
        // I.executeScript(() => sessionStorage.clear())
        // I.executeScript(() => console.error('Boom!'))
        // I.waitForVisible('.new-todo')  
        //await I.amOnPage('http://localhost:3333')
       // await I.click('#cookie-accept-submit');
        //await I.wait(10000);
       // await I.click('#cookie-accept-all-success-banner-hide');
       // await I.seeElement('#authorizeCommand');
      
       
      
        //await I.click('input[type="submit"]');
    },

    async enterTodo(todo) {
        I.fillField('.new-todo', todo)
        I.pressKey('Enter')        
    },

    async seeNumberOfTodos(todoItems) {
        //await I.retry(10).click('input[type="submit"]');

      
        await I.fillField('#username', "solicitor@example.com");
        await I.fillField('#password', "Password12!");
        await I.click('input[type="submit"]');
        // I.fillField('.new-todo', todoItems)
        // I.pressKey('Enter')  
        //await AxeRunner.runAndReportAccessibility();
    }
}