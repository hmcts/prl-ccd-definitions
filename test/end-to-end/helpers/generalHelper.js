/* eslint-disable no-await-in-loop */
// eslint-disable-next-line no-undef
const Helper = codecept_helper;
// const { Helper } = codeceptjs;
const longWait = 30;
const loopMax = 3;
// const { Playwright } = this.helpers;
const testLogger = require('./testLogger');

const fields = {
  eventList: 'select[id="next-step"]',
  submit: 'button[type="submit"]'
};

class GeneralHelper extends Helper {
  async addNewDocument(field) {
    const { Playwright } = this.helpers;
    await Playwright.click('Add new');
    await Playwright.attachFile(`input[id="${field}_value"]`, '../resource/dummy.pdf');
  }

  async attachDocument(field) {
    const { Playwright } = this.helpers;
    await Playwright.attachFile(`input[id="${field}"]`, '../resource/dummy.pdf');
  }

  async amOnHistoryPageWithSuccessNotification() {
    const historyResponseTime = 6;
    const { Playwright } = this.helpers;
    await Playwright.wait(historyResponseTime);
    await Playwright.waitForText('History');
    await Playwright.wait(historyResponseTime);
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

    await Playwright.wait(searchResponseTime);
    await Playwright.waitForElement(postcodeInputLocator);
    await Playwright.fillField(postcodeInputLocator, postcode);
    await Playwright.click(findAddressBtn);
    await Playwright.wait(searchResponseTime);
    await Playwright.waitForElement(addressListLocator);
    await Playwright.wait(searchResponseTime);
    await Playwright.selectOption(addressListLocator, '1: Object');
  }

  async submitEvent() {
    const { Playwright } = this.helpers;
    let retryCount = 0;
    let apiResponseResolved = null;
    while (retryCount < loopMax) {
      try {
        const apiResponse = Playwright.waitForResponse('**/validate?**');
        await Playwright.waitForText('Check your answers', '30');
        await Playwright.click('Save and continue');

        apiResponseResolved = await apiResponse;
        const eventTriggerResponseCode = apiResponseResolved.status();
        const successStatusCode = 200;
        testLogger.AddMessage(`${apiResponseResolved.status()} =>  ${apiResponseResolved.url()}`);
        if (eventTriggerResponseCode !== successStatusCode) {
          testLogger.AddMessage('retrying event continue');
          throw Error(`event continue validate api failed with response code ${eventTriggerResponseCode}`);
        }
        return;
      } catch (submitEventError) {
        retryCount += 1;
        testLogger.AddMessage('submit event Sleep 30sec before retry. to handle env flakiness');
        await Playwright.wait('30');
      }
    }
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
        testLogger.AddMessage('continue event Sleep 30sec before retry. to handle env flakiness');
        await Playwright.wait('30');
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
        testLogger.AddMessage('trigger event Sleep 30sec before retry. to handle env flakiness');
        await Playwright.wait('30');
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

  async clickTillElementFound(tabSelector, nextBtnSelector) {
    const helper = this.helpers.Playwright;
    try {
      const eleVisible = await helper.grabNumberOfVisibleElements(tabSelector);
      /* eslint-disable no-await-in-loop */
      for (let i = 1; i < loopMax; i++) {
        if (eleVisible === 0) {
          console.log(`loop ${i}`);
          return helper.click(nextBtnSelector);
        }

        if (eleVisible === 1) {
          return helper.click(tabSelector);
          // break;
        }
      }
      // eslint-disable-next-line id-blacklist
    } catch (err) {
      console.log('Skipping operation as element is not visible');
    }
    return null;
  }

  async navigationInWAEnvs(selector, ...options) {
    const helper = this.helpers.Playwright;
    try {
      const waVisible = await helper.grabCurrentUrl();
      console.log(`WA current url is ### ${waVisible}`);

      if (waVisible.includes('https://manage-case.aat.platform.hmcts.net')) {
        return helper.click(selector, ...options);
      }
      // eslint-disable-next-line id-blacklist
    } catch (err) {
      console.log('Skipping operation as element is not visible');
    }
    return null;
  }

  async reloadPage(selector) {
    const helper = this.helpers.Playwright;
    try {
      /* eslint-disable no-await-in-loop */
      for (let i = 1; i < longWait; i++) {
        const numVisible = await helper.grabNumberOfVisibleElements(selector);
        if (numVisible === 0) {
          console.log('Going to refresh page as ele is not visible');
          await helper.wait(i);
          return helper.refreshPage();
        }

        if (numVisible === 1) {
          await helper.click(selector);
          // break;
        }
      }
      // eslint-disable-next-line id-blacklist
    } catch (err) {
      console.log('Skipping operation as element is not visible');
    }
    return null;
  }

  async retryBlock(functionBlock) {
    let counter = 0;
    let errObjTracker = null;
    const maxRetyLimit = 3;
    while (counter < maxRetyLimit) {
      counter += 1;
      try {
        await functionBlock();
        return;
      } catch (errObj) {
        errObjTracker = errObj;
        testLogger.AddMessage(`Error in retry block: ${errObj}`);
      }
    }
    throw errObjTracker;
  }
}

// export default GeneralHelper;
module.exports = GeneralHelper;