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
    await I.retry(retryCount).amOnPage(baseUrl);
    await I.seeElement('#cookie-accept-submit');
    await I.retry(retryCount).click('#cookie-accept-submit');
    await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
    await I.retry(retryCount).seeElement('#authorizeCommand');
    await I.retry(retryCount).seeElement(this.fields.email);
    await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
    await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    await I.retry(retryCount).seeElement(this.fields.submit);
  }
};
