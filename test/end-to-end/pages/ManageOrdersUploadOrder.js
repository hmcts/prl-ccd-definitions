const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    textareaText: 'Testing text area',typeOfOrder: 'select[id="selectTypeOfOrder"]',
    whichHearing: 'select[id="hearingType"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Manage orders');
  },

  async selectOrder() {
    await I.retry(retryCount).waitForText('Manage orders');
    await I.retry(retryCount).click('#manageOrdersOptions-uploadAnOrder');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async uploadOrder() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Upload an order');
    await I.retry(retryCount).click('#childArrangementOrders-committalWarrantFC604');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click('#domesticAbuseOrders-landlordOrMortgageNotice');
    await I.retry(retryCount).click('#fcOrders-warrantOfCommittal');
    await I.retry(retryCount).click('#otherOrdersOption-other');
    await I.retry(retryCount).fillField('#nameOfOrder', 'Text Area');
    await I.retry(retryCount).click('#isTheOrderUploadedByConsent_Yes');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async typeOfUploadOrder() {
    const uploadTime = 5;
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.typeOfOrder, 'Final');
    await I.retry(retryCount).click('#doesOrderClosesCase_Yes');
    await I.retry(retryCount).fillField('#dateOrderMade-day', '1');
    await I.retry(retryCount).fillField('#dateOrderMade-month', '1');
    await I.retry(retryCount).fillField('#dateOrderMade-year', '2022');
    await I.retry(retryCount).attachFile('#appointmentOfGuardian', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },
  async checkOrder() {
    await I.retry(retryCount).click(this.fields.submit);
  },

  async confirmRecipientsUploadOrder() {
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

  async runManageOrdersUploadOrderHappyPath() {
    await this.triggerEvent();
    await this.selectOrder();
    await this.uploadOrder();
    await this.typeOfUploadOrder();
    await this.checkOrder();
    await this.confirmRecipientsUploadOrder();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
