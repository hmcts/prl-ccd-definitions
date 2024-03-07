const I = actor();
const retryCount = 3;

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('View PDF application');
  },

  async downloadApplication() {
    await I.retry(retryCount).waitForText('Download Application', '30');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runViewPDFApplicationEvent() {
    await this.triggerEvent();
    await this.downloadApplication();
    await I.retry(retryCount).click('Save and continue');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};