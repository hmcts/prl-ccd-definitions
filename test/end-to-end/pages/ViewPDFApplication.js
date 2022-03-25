const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.retry(3).triggerEvent('View PDF application');
  },

  async downloadApplication() {
    await I.retry(3).waitForText('Download Application', '30');
    await I.retry(3).click(this.fields.submit);
  },

  async runViewPDFApplicationEvent() {
    await this.triggerEvent();
    await this.downloadApplication();
    await I.retry(3).click('Save and continue');
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};