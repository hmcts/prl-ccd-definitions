const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    otherChildrenNo: '//input[@id="childrenNotPartInTheCaseYesNo_No"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Other children not in the case');
  },

  async noOtherChildren() {
    await I.waitForText('Do you or respondents have other children who are not part of this application?');
    await I.retry(retryCount).checkOption(this.fields.otherChildrenNo);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runOtherChildDetailsEvent() {
    await this.triggerEvent();
    await this.noOtherChildren();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};