const I = actor();

module.exports = {
  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('Submit and pay');
  },

  async confidentialityStatement() {
    I.wait('5');
    await I.waitForText('Confidentiality Statement');
    I.wait('1');
    await I.click('#confidentialityDisclaimer_confidentialityChecksChecked-confidentialityChecksChecked');
    await I.click('Continue');
  },

  async declaration() {
    await I.waitForText('Declaration');
    await I.wait('1');
    await I.click('#payAgreeStatement-agree');
    I.wait('1');
    await I.click('Continue');
  },

  async payNow() {
    I.wait('2');
    await I.click('Continue');
    I.wait('2');
    await I.click('Pay now');
  },

  async submitAndPay() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.payNow();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
