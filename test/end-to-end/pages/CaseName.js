/* eslint-disable no-console */
const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    eventList: 'select[id="next-step"]',
    caseNameBox: '//input[@id="applicantCaseName"]'
  },

  // Clean the code below once cross browser Helper issue is resolved
  //   async triggerEvent() {
  //     await I.retry(retryCount).triggerEvent('Case name');
  //   },

  async changeCaseName() {
    await I.retry(retryCount).waitForVisible(this.fields.caseNameBox);
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField(this.fields.caseNameBox, 'Updated Case Name');
    await I.retry(retryCount).continueEvent();
  },

  async triggerEvent(eventName) {
    await I.retry(retryCount).waitForElement(this.fields.eventList);
    await I.retry(retryCount).selectOption(this.fields.eventList, eventName);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async amOnHistoryPageWithSuccessNotification() {
    await I.retry(retryCount).waitForText('History');
    await I.runAccessibilityTest();
  },

  async runEventCaseName() {
    await this.triggerEvent('Case name');
    await this.changeCaseName();
    await I.retry(retryCount).click('Save and continue');
    await this.amOnHistoryPageWithSuccessNotification();
  }
};
