const I = actor();
const retryCount = 3;

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Case name');
  },

  async changeCaseName() {
    await I.retry(retryCount).waitForText('Case Name');
    await I.retry(retryCount).fillField('//input[@id="applicantCaseName"]', 'Updated Case Name');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click('Continue');
  },

  async runEventCaseName() {
    await this.triggerEvent();
    await this.changeCaseName();
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
