const I = actor();
const retryCount = 3;

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Amend court details');
  },

  async amendCourtDetails() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Amend court details');
    await I.retry(retryCount).fillField('#reasonForAmendCourtDetails', 'test');
    await I.retry(retryCount).fillField('#courtEmailAddress', 'westlondonfamilyenquiries@justice.gov.uk');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async amendCourtDetailsHappyPath() {
    await this.triggerEvent();
    await this.amendCourtDetails();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};