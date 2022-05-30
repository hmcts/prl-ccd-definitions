/* eslint-disable no-console */
const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    eventList: 'select[id="next-step"]'
  },

  // Clean the code below once cross browser Helper issue is resolved
  //   async triggerEvent() {
  //     await I.retry(retryCount).triggerEvent('Case name');
  //   },

  async changeCaseName() {
    await I.retry(retryCount).waitForText('Case Name');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField('//input[@id="applicantCaseName"]', 'Updated Case Name');
    await I.retry(retryCount).click('Continue');
  },

  async triggerEvent(eventName) {
    await I.retry(retryCount).waitForElement(this.fields.eventList);
    await I.retry(retryCount).selectOption(this.fields.eventList, eventName);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async amOnHistoryPageWithSuccessNotification() {
    I.wait('5');
    await I.retry(retryCount).waitForText('History');
    await I.runAccessibilityTest();
    await I.retry(retryCount).waitForElement('i.icon-tick');
    I.wait('5');
  },

  async runEventCaseName() {
    await this.triggerEvent('Case name');
    await this.changeCaseName();
    await I.retry(retryCount).click('Save and continue');
    await this.amOnHistoryPageWithSuccessNotification();
  }
};
