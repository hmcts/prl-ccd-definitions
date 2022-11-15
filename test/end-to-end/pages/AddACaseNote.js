const I = actor();
const retryCount = 3;

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Add a case note');
  },

  async caseNote() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Add a case note');
    await I.retry(retryCount).fillField('#subject', 'test');
    await I.retry(retryCount).fillField('#caseNote', 'test notes');
    await I.retry(retryCount).click('Continue');
    I.wait('2');
  },

  async addACaseNoteHappyPath() {
    await this.triggerEvent();
    await this.caseNote();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};