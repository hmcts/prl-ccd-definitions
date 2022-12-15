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
    await I.retry(retryCount).click('Continue');
    I.wait('2');
    await I.retry(retryCount).click('Pay now');
    I.wait('5');
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.payNow();
    // await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};
