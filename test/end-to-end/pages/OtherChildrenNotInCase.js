const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    
  },

  async triggerEvent() {
    await I.triggerEvent('Other children not in the case');
  },

  async noOtherChildren() {
    await I.waitForText('Do you or respondents have other children who are not part of this application?');
    await I.retry(retryCount).checkOption('//input[@id="childrenNotPartInTheCaseYesNo_No"]');
},

  async runOtherChildDetailsEvent() {
    await this.triggerEvent();
    await this.fillOtherChildrenPage();
    await this.fillAdditionalQuestionsPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};