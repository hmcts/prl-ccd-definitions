const I = actor();
const retryCount = 3;

module.exports = {
  fields: { submit: 'button[type="submit"]',
    pbaNumber: 'select[id="pbaAccountNumber"]'
  },

  async payment() {
    I.wait('10');
    await I.retry(retryCount).click('body div.mat-tab-label-container > div > div');
    await I.retry(retryCount).click('Service Request');
    I.wait('8');
    await I.retry(retryCount).click('Pay now');
    I.wait('1');
    await I.retry(retryCount).click('#pbaAccount');
    await I.retry(retryCount).selectOption(this.fields.pbaNumber, 'PBA0086304');
    await I.retry(retryCount).fillField('#pbaAccountRef', '12345678');
    await I.retry(retryCount).click('#conditional-contact > div.govuk-form-group.ng-star-inserted > label');
    I.wait('2');
  },
  async confirmPayment(){
    await I.retry(retryCount).click('Confirm payment');
    I.wait('2');
    await I.retry(retryCount).waitForText('Payment successful');
  },

  async payByCard() {
    await this.payment();
    await this.confirmPayment();
  }
};