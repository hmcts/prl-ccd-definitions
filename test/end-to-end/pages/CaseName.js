const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Case name');
  },

  async changeCaseName() {
    await I.waitForText('Case Name');
    await I.fillField('//input[@id="ApplicantCaseName"]', 'Updated Case Name');
    await I.click('Continue');
  },

  async runEventCaseName() {
    await this.triggerEvent();
    await this.changeCaseName();
    I.wait('2');
    await I.click('Submit');
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
