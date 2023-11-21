const I = actor();
const retryCount = 3;
const medWait = 20;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    caseStatus: '.text-16',
    helpWithFees_Yes: '#helpWithFees_Yes',
    helpWithFees_No: '#helpWithFees_No',
    helpWithFeesReferenceNumber_text: '#helpWithFeesReferenceNumber',
    HWFQuestion: 'Has the applicant applied for Help with Fees?',
    prlNoHWFText:
      'Help with Fees is not yet available in the Family Private Law digital service.',
    HWFYesErrorMsg:
      'Help with Fees is not yet available in Family Private Law digital ' +
      'service. Select \'No\' to continue with your application',
    HWFRefNum: 'ABC-123-DEF'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Submit and pay');
  },

  async triggerDummyPaymentEvent() {
    await I.retry(retryCount).triggerEvent('Dummy Payment confirmation');
    await I.waitForText('Dummy Payment confirmation');
    await I.waitForText('Make the payment');
  },

  async confidentialityStatement() {
    await I.retry(retryCount).waitForText('Confidentiality Statement', medWait);
    await I.retry(retryCount).click(
      '#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked'
    );
    await I.retry(retryCount).click('Continue');
  },

  async declaration() {
    await I.retry(retryCount).waitForText('Declaration');
    await I.retry(retryCount).click('#payAgreeStatement-agree');
    await I.retry(retryCount).waitForText(this.fields.prlNoHWFText);
    await I.retry(retryCount).click('Continue');
  },

  async helpWithFeeNo() {
    await I.retry(retryCount).waitForText(this.fields.HWFQuestion);
    await I.retry(retryCount).click(this.fields.helpWithFees_No);
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('6');
    await I.retry(retryCount).waitForText('Continue to payment');
    await I.retry(retryCount).click('Close and Return to case details');
    await I.wait('2');
  },
  async helpWithFeeYes() {
    await I.wait('2');
    await I.retry(retryCount).waitForText(this.fields.HWFQuestion);
    await I.retry(retryCount).click(this.fields.helpWithFees_Yes);
    await I.wait('1');
    await I.retry(retryCount).fillField(
      this.fields.helpWithFeesReferenceNumber_text,
      this.fields.HWFRefNum
    );
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText(this.fields.HWFYesErrorMsg);
  },

  async payNow() {
    await I.retry(retryCount).click(this.fields.submit);
  },

  async happensNext() {
    await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runDummyPayment() {
    await this.triggerDummyPaymentEvent();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async caseSubmittedCA() {
    await I.waitForText('Submitted');
  },

  async answerHelpWithFeesNo() {
    await I.wait('4');
    await I.retry(retryCount).click(this.fields.helpWithFees_No);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeNo();
    await this.runDummyPayment();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await this.caseSubmittedCA();
  },

  async submitAndPay_HWF_Yes() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeYes();
  },

  async submitAndPayForDummySolicitorApplication() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.answerHelpWithFeesNo();
    await this.happensNext();
    await this.happensNext();
    await this.runDummyPayment();
    await this.caseSubmittedCA();
  }
};
