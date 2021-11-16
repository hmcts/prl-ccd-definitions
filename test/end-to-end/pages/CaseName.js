const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    I.wait('3');
    await I.triggerEvent('Case name');
  },

  async changeCaseName() {
    await I.fillField('//textarea[@id="ApplicantCaseName"]', 'Updated Case Name');
    await I.click('Continue');
  },

  async runEventCaseName() {
    await this.triggerEvent();
    await this.changeCaseName();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
