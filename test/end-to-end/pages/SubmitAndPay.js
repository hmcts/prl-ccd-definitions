const I = actor();

module.exports = {
  fields: {
    submit: 'button[type="submit"]'},

  async triggerEvent() {
    await I.retry(3).triggerEvent('Submit and pay');
  },

  async confidentialityStatement() {
    I.wait('5');
    await I.retry(3).waitForText('Confidentiality Statement');
    I.wait('1');
    await I.retry(3).click('#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked');
    await I.retry(3).click('Continue');
  },

  async declaration() {
    await I.retry(3).waitForText('Declaration');
    await I.retry(3).wait('1');
    await I.retry(3).click('#payAgreeStatement-agree');
    I.wait('1');
    await I.retry(3).click('Continue');
  },

  async payNow() {
    I.wait('2');
    await I.retry(3).click('Continue');
    I.wait('2');
    await I.retry(3).click('Pay now');
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.payNow();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};
