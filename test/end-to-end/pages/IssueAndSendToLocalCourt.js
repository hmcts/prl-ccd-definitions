const I = actor();
const retryCount = 3;

module.exports = {

  fields: {submit: 'button[type="submit"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Issue and send to local court');
  },

  async localCourtAdmin() {
    I.wait('2');
    await I.retry(retryCount).click('Add new');
    I.wait('3');
    await I.retry(retryCount).fillField('#localCourtAdmin_0_email', 'westlondonfamilyenquiries@justice.gov.uk');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async issueAndSendToLocalCourtHappyPath() {
    await this.triggerEvent();
    await this.localCourtAdmin();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};