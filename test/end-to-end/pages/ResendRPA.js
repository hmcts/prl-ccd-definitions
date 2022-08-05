const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Resend RPA');
  },

  async addACaseNoteHappyPath() {
    await this.triggerEvent();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
