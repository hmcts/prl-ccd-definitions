const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',
    typeOfOrder: 'select[id="selectTypeOfOrder"]',
    whichHearing: 'select[id="hearingType"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Manage orders');
  },

  async selectOrder() {
    await I.retry(retryCount).waitForText('Manage orders');
    await I.retry(retryCount).click('#manageOrdersOptions-createAnOrder');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async createOrder() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Create an order');
    await I.retry(retryCount).click('#createSelectOrderOptions-blankOrderOrDirectionsWithdraw');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async typeOfOrder() {
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.typeOfOrder, 'Final');
    await I.retry(retryCount).click('#isCaseWithdrawn_Yes');
    await I.retry(retryCount).click('#doesOrderClosesCase_Yes');
    await I.retry(retryCount).click('#isTheOrderByConsent_Yes');
    await I.retry(retryCount).click('#wasTheOrderApprovedAtHearing_Yes');
    I.wait('1');
    await I.retry(retryCount).selectOption(this.fields.typeOfOrder, 'To be built');
    await I.retry(retryCount).click('#judgeOrMagistrateTitle-magistrate');
    await I.retry(retryCount).fillField('#judgeOrMagistratesLastName', 'Test');
    await I.retry(retryCount).fillField('#justiceLegalAdviserFullName', 'Full Name');
    await I.retry(retryCount).fillField('#dateOrderMade-day', '1');
    await I.retry(retryCount).fillField('#dateOrderMade-month', '1');
    await I.retry(retryCount).fillField('#dateOrderMade-year', '2022');
    await I.retry(retryCount).click('#isTheOrderAboutAllChildren-no');
    await I.retry(retryCount).fillField('#recitalsOrPreamble', 'test');
    await I.retry(retryCount).fillField('#orderDirections', 'test');
    await I.retry(retryCount).fillField('#furtherDirectionsIfRequired', 'test');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async checkOrder() {
    await I.retry(retryCount).click(this.fields.submit);
  },

  async confirmRecipients() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Confirm recipients');
    await I.retry(retryCount).click('#orderRecipients-applicantOrApplicantSolicitor');
    await I.retry(retryCount).click('#orderRecipients-respondentOrRespondentSolicitor');
    await I.retry(retryCount).click('#otherOrderRecipients-xyz');
    await I.retry(retryCount).click('#otherOrderRecipients-xyz');
    await I.retry(retryCount).click('#cafcassRecipient-cafcass');
    I.wait('2');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).fillField('#cafcassEmailAddress_value', 'test@gmail.com');
    await I.retry(retryCount).click('#otherRecipient-other');
    I.wait('2');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).fillField('#otherEmailAddress_value', 'test@gmail.com');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },
  async runManageOrdersCreateOrderC21HappyPath() {
    await this.triggerEvent();
    await this.selectOrder();
    await this.createOrder();
    await this.typeOfOrder();
    await this.checkOrder();
    await this.confirmRecipients();
    I.wait('3');
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
