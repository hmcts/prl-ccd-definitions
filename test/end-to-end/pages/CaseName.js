const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
     await I.retry(3).triggerEvent('Case name');
  },

  async changeCaseName() {
     await I.retry(3).waitForText('Case Name');
     await I.retry(3).fillField('//input[@id="applicantCaseName"]', 'Updated Case Name');
     await I.retry(3).click('Continue');
  },

  async runEventCaseName() {
    await this.triggerEvent();
    await this.changeCaseName();
    I.wait('2');
     await I.retry(3).click('Save and continue');
     await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};
