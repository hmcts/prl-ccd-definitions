/* eslint-disable no-await-in-loop */
// eslint-disable-next-line no-undef
const Helper = codecept_helper;
const testLogger = require('./testLogger');

const loopMax = 3;

const fields = {
  eventList: 'select[id="next-step"]',
  submit: 'button[type="submit"]'
};

class GeneralHelper extends Helper {
  async addNewDocument(field) {
    const { Playwright } = this.helpers;
    await Playwright.click('Add new', { css: `#${field}>div>button` });
    await Playwright.attachFile(`input[id="${field}_value"]`, '../resource/dummy.pdf');
  }

  async attachDocument(field) {
    const { Playwright } = this.helpers;
    await Playwright.attachFile(`input[id="${field}"]`, '../resource/dummy.pdf');
  }

  async amOnHistoryPageWithSuccessNotification() {
    const historyResponseTime = 4;
    const { Playwright } = this.helpers;
    await Playwright.wait(historyResponseTime);
    await Playwright.waitForText('History');
    await Playwright.wait(historyResponseTime);
  }

  async amOnApplicationPageAfterSuccessCaseCreation() {
    const applicationResponseTime = 4;
    const { Playwright } = this.helpers;
    await Playwright.wait(applicationResponseTime);
    await Playwright.waitForText('Application');
    await Playwright.wait(applicationResponseTime);
  }

  async selectFromList(list, value) {
    const { Playwright } = this.helpers;
    await Playwright.waitForElement(list);
    await Playwright.wait('5');
    await Playwright.selectOption(list, value);
  }

  async selectPostCodeLookupAddress(locator, postcode) {
    const searchResponseTime = 3;
    const { Playwright } = this.helpers;
    const postcodeInputLocator = `//input[@id="${locator}_postcodeInput"]`;
    const addressListLocator = `select[id="${locator}_addressList"]`;
    const findAddressBtn = `#${locator}_postcodeLookup > button`;

    await Playwright.waitForElement(postcodeInputLocator);
    await Playwright.fillField(postcodeInputLocator, postcode);
    await Playwright.click(findAddressBtn);
    await Playwright.waitForElement(addressListLocator);
    await Playwright.wait(searchResponseTime);
    await Playwright.selectOption(addressListLocator, '1: Object');
  }

  async submitEvent() {
    const saveResponseTime = 5;
    const { Playwright } = this.helpers;
    await Playwright.waitForText('Check your answers', '30');
    await Playwright.click('Save and continue');
    await Playwright.wait(saveResponseTime);
  }

  async continueEvent() {
    const { Playwright } = this.helpers;

    let retryCount = 0;
    let apiResponseResolved = null;
    while (retryCount < loopMax) {
      try {
        const apiResponse = Playwright.waitForResponse('**/validate?**');
        const continueBtnLocator = '//ccd-case-edit//button[contains(text(),"Continue")]';
        await Playwright.waitForElement(continueBtnLocator);
        await Playwright.click(continueBtnLocator);

        apiResponseResolved = await apiResponse;
        const eventTriggerResponseCode = apiResponseResolved.status();
        const successStatusCode = 200;
        testLogger.AddMessage(`${apiResponseResolved.status()} =>  ${apiResponseResolved.url()}`);
        if (eventTriggerResponseCode !== successStatusCode) {
          testLogger.AddMessage('retrying event continue');
          throw Error(`event continue validate api failed with response code ${eventTriggerResponseCode}`);
        }
        return;
      } catch (eventTriggerError) {
        retryCount += 1;
      }
    }
  }

  async triggerEvent(eventName) {
    const { Playwright } = this.helpers;
    await Playwright.waitForText('Next step');
    let retryCount = 0;
    let apiResponseResolved = null;
    while (retryCount < loopMax) {
      try {
        const apiResponse = Playwright.waitForResponse('**/event-triggers/**');
        await Playwright.waitForElement(`//select[@id = "next-step"]/option[contains(text(),"${eventName}")]`);
        await Playwright.selectOption(fields.eventList, eventName);
        await Playwright.click(fields.submit);
        apiResponseResolved = await apiResponse;

        const eventTriggerResponseCode = apiResponseResolved.status();
        const successStatusCode = 200;
        testLogger.AddMessage(`${apiResponseResolved.status()} =>  ${apiResponseResolved.url()}`);
        if (eventTriggerResponseCode !== successStatusCode) {
          throw Error(`event trigger api failed with response code ${eventTriggerResponseCode}`);
        }
        await Playwright.waitForInvisible('//select[@id = "next-step"]');
        return;
      } catch (eventTriggerError) {
        testLogger.AddMessage(eventTriggerError);
        retryCount += 1;
      }
    }
  }

  async waitForPage(header, headerText) {
    const { Playwright } = this.helpers;

    try {
      // eslint-disable-next-line no-undefined
      if (headerText === undefined) {
        await Playwright.waitForElement(header, '90');
      } else {
        await Playwright.waitForText(headerText, '90', header);
      }
    } catch (error) {
      throw error;
    }
  }
  async seeDocuments(title, documentName) {
    const { Playwright } = this.helpers;
    await Playwright.see(title);
    await Playwright.see(documentName);
  }
}

module.exports = GeneralHelper;
