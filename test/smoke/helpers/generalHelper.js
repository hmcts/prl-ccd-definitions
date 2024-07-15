// eslint-disable-next-line no-undef
const Helper = codecept_helper;

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

  async triggerEvent(eventName) {
    const { Playwright } = this.helpers;
    await Playwright.waitForElement(fields.eventList);
    await Playwright.selectOption(fields.eventList, eventName);
    await Playwright.click(fields.submit);
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
