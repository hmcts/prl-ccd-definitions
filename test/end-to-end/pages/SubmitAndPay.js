const I = actor();
const retryCount = 3;

module.exports = {
  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Submit and pay');
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

  async payNow() {
    I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async happensNext() {
    I.wait('6');
    await I.retry(retryCount).click(this.fields.submit);
    I.wait('4');
    await I.retry(retryCount).waitForText('Case Status');
    I.wait('2');
    await I.retry(retryCount).waitForText('Pending');
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.payNow();
    // await this.happensNext();
    // await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
