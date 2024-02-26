const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    withdrawApplicationConfirmYes: '#withDrawApplicationData_withDrawApplication_Yes',
    withdrawApplicationConfirmReason: '#withDrawApplicationData_withDrawApplicationReason',
    textareaText: 'Testing text area'
  },

  async triggerWithDrawApplicationEvent() {
    await I.retry(retryCount).waitForText('Submitted');
    await I.retry(retryCount).triggerEvent('Withdraw application');
  },
  async confirmWithdrawApplication() {
    await I.wait('4');
    await I.retry(retryCount).click(this.fields.withdrawApplicationConfirmYes);
    await I.retry(retryCount).fillField(this.fields.withdrawApplicationConfirmReason, this.fields.textareaText);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
    await I.retry(retryCount).see('Check your answers');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('10');
    await I.retry(retryCount).see('Application withdrawn');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await I.retry(retryCount).see('Withdrawn');
  },

  async solicitorWithdrawApplicationFlow() {
    await this.triggerWithDrawApplicationEvent();
    await this.confirmWithdrawApplication();
  }

};