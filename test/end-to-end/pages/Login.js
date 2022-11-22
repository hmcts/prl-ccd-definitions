const I = actor();
const config = require('../config');

const retryCount = 3;

// eslint-disable-next-line no-unused-vars
const baseUrl = config.baseUrl;

module.exports = {
  fields: {
    email: '#username',
    password: '#password',
    submit: 'input[type="submit"]'
  },

  async loginAsSolicitor() {
    await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      await I.retry(retryCount).click('#cookie-accept-submit');
      await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalPaymentUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalPaymentUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalPaymentUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalPaymentUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
  },
  
    async loginAsCourtAdminUserOne() {
      await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      // await I.retry(retryCount).click('#cookie-accept-submit');
      // await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      // await I.runAccessibilityTest();
      // await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.testCourtAdminUserOne.email);
      await I.fillField(this.fields.password, config.testCourtAdminUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.testCourtAdminUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.testCourtAdminUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);  
  },
  
  async loginAsCourtAdminUserTwo() {
    await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      await I.retry(retryCount).click('#cookie-accept-submit');
      await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.testCourtAdminUserTwo.email);
      await I.fillField(this.fields.password, config.testCourtAdminUserTwo.password);
    } catch {
      await I.fillField(this.fields.email, config.testCourtAdminUserTwo.email);
      await I.fillField(this.fields.password, config.testCourtAdminUserTwo.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
  }
};