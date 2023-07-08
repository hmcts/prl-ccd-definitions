const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    helpWithFees_Yes: '#helpWithFees_Yes',
    helpWithFees_No: '#helpWithFees_No',
    helpWithFeesReferenceNumber_text: '#helpWithFeesReferenceNumber'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Submit and pay');
  },

  async triggerEvent_TS() {
    await I.retry(retryCount).triggerEvent('Dummy Payment confirmation');
  },

  async confidentialityStatement() {
    I.wait('10');
    await I.retry(retryCount).waitForText('Confidentiality Statement');
    I.wait('1');
    await I.retry(retryCount).click('#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked');
    await I.retry(retryCount).click('Continue');
  },

  async declaration() {
    I.wait('2');
    await I.retry(retryCount).waitForText('Declaration');
    await I.retry(retryCount).wait('1');
    await I.retry(retryCount).click('#payAgreeStatement-agree');
    I.wait('1');
    await I.retry(retryCount).click('Continue');
  },

  async helpWithFeeNo() {
    await I.wait('2');
    await I.retry(retryCount).waitForText('Has the applicant applied for Help with Fees?');
    await I.retry(retryCount).click(this.fields.helpWithFees_No);
    await I.wait('1');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('6');
    await I.retry(retryCount).waitForText('Continue to payment');
    await I.retry(retryCount).click('Pay the application fee.');
    await I.wait('2');
  },

  async payNow() {
    I.wait('2');
    await I.retry(retryCount).click('Continue');
    I.wait('5');
    await I.retry(retryCount).waitForText('Please visit service request to make the payment');
    await I.wait('3');
    await I.retry(retryCount).click('click here to pay');
    await I.wait('3');
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeNo();
    // await this.payNow();
  },
  async dummyPaymentConfirmation() {
    await this.triggerEvent_TS();
    await I.retry(retryCount).click('Make the payment');
    await I.wait('5');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
