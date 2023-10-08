// eslint-disable-next-line no-undef
const Helper = codecept_helper;
// const { Helper } = codeceptjs;
const longWait = 30;
const loopMax = 3;

const fields = {
  eventList: 'select[id="next-step"]',
  submit: 'button[type="submit"]'
};

class GeneralHelper extends Helper {
  async addNewDocument(field) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.click('Add new', { css: `#${field}>div>button` });
    await Puppeteer.attachFile(`input[id="${field}_value"]`, '../resource/dummy.pdf');
  }

  async attachDocument(field) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.attachFile(`input[id="${field}"]`, '../resource/dummy.pdf');
  }

  async amOnHistoryPageWithSuccessNotification() {
    const historyResponseTime = 6;
    const { Puppeteer } = this.helpers;
    await Puppeteer.wait(historyResponseTime);
    await Puppeteer.waitForText('History');
    await Puppeteer.wait(historyResponseTime);
  }

  async selectFromList(list, value) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.waitForElement(list);
    await Puppeteer.wait('5');
    await Puppeteer.selectOption(list, value);
  }

  async selectPostCodeLookupAddress(locator, postcode) {
    const searchResponseTime = 3;
    const { Puppeteer } = this.helpers;
    const postcodeInputLocator = `//input[@id="${locator}_postcodeInput"]`;
    const addressListLocator = `select[id="${locator}_addressList"]`;
    const findAddressBtn = `#${locator}_postcodeLookup > button`;

    await Puppeteer.wait(searchResponseTime);
    await Puppeteer.waitForElement(postcodeInputLocator);
    await Puppeteer.fillField(postcodeInputLocator, postcode);
    await Puppeteer.click(findAddressBtn);
    await Puppeteer.wait(searchResponseTime);
    await Puppeteer.waitForElement(addressListLocator);
    await Puppeteer.wait(searchResponseTime);
    await Puppeteer.selectOption(addressListLocator, '1: Object');
  }

  async submitEvent() {
    const { Puppeteer } = this.helpers;
    const saveResponseTime = 5;
    try {
      await Puppeteer.waitForText('Check your answers', '30');
      await Puppeteer.click('Save and continue');
      await Puppeteer.wait(saveResponseTime);
    } catch {
      await Puppeteer.click('Continue');
      await Puppeteer.waitForText('Check your answers', '30');
      await Puppeteer.click('Save and continue');
      await Puppeteer.wait(saveResponseTime);
    }
  }

  async triggerEvent(eventName) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.waitForElement(fields.eventList);
    await Puppeteer.selectOption(fields.eventList, eventName);
    await Puppeteer.click(fields.submit);
  }

  async waitForPage(header, headerText) {
    const { Puppeteer } = this.helpers;

    try {
      // eslint-disable-next-line no-undefined
      if (headerText === undefined) {
        await Puppeteer.waitForElement(header, '90');
      } else {
        await Puppeteer.waitForText(headerText, '90', header);
      }
    } catch (error) {
      throw error;
    }
  }
  async seeDocuments(title, documentName) {
    const { Puppeteer } = this.helpers;
    await Puppeteer.see(title);
    await Puppeteer.see(documentName);
  }

  async clickTillElementFound(tabSelector, nextBtnSelector) {
    const helper = this.helpers.Puppeteer;
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
    const helper = this.helpers.Puppeteer;
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
    const helper = this.helpers.Puppeteer;
    try {
      const numVisible = await helper.grabNumberOfVisibleElements(selector);
      /* eslint-disable no-await-in-loop */
      for (let i = 1; i < longWait; i++) {
        if (numVisible === 0) {
          await helper.wait(i);
          return helper.refreshPage();
        }

        if (numVisible === 1) {
          await helper.click(selector);
          break;
        }
      }
      // eslint-disable-next-line id-blacklist
    } catch (err) {
      console.log('Skipping operation as element is not visible');
    }
    return null;
  }
}

// export default GeneralHelper;
module.exports = GeneralHelper;