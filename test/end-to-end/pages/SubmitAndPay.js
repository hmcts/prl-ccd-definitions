const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    caseStatus: '.text-16',
    helpWithFeesNo: '#helpWithFees_No'

  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Submit and pay');
  },

  async confidentialityStatement() {
    await I.wait('10');
    await I.retry(retryCount).waitForText('Confidentiality Statement');
    await I.wait('1');
    await I.retry(retryCount).click('#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked');
    await I.retry(retryCount).click('Continue');
  },

  async declaration() {
    await I.wait('2');
    await I.retry(retryCount).waitForText('Declaration');
    await I.retry(retryCount).wait('1');
    await I.retry(retryCount).click('#payAgreeStatement-agree');
    await I.wait('1');
    await I.retry(retryCount).click('Continue');
  },

  async payNow() {
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async happensNext() {
    await I.wait('15')
    //await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runDummyPayment() {
    await I.wait('4');
    await I.retry(retryCount).waitForText('Pending');
    await I.wait('4');
    await I.retry(retryCount).triggerEvent('Dummy Payment confirmation');
    await I.wait('4');
    await I.retry(retryCount).click('Make the payment');
    await I.wait('6');
  },

  async caseSubmittedCA() {
    await I.wait('4');
    await I.retry(retryCount).waitForText('Submitted');
  },

  async answerHelpWithFeesNo(){
    await I.wait('4');
    await I.retry(retryCount).click(this.fields.helpWithFeesNo);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.payNow();
    await this.happensNext();
    await this.runDummyPayment();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await this.caseSubmittedCA();
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