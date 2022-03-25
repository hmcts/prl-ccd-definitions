const I = actor();
const config = require('../config');

// eslint-disable-next-line no-unused-vars
const baseUrl = config.baseUrl;

module.exports = {

  fields: {
    email: '#username',
    password: '#password',
    submit: 'input[type="submit"]'
  },

  async loginAsSolicitor() {
    await I.retry(3).amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.retry(3).click('#cookie-accept-submit');
    await I.retry(3).click('#cookie-accept-all-success-banner-hide');
    await I.retry(3).seeElement('#authorizeCommand');
    await I.retry(3).fillField(this.fields.email, config.legalProfessionalUserOne.email);
    await I.retry(3).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    await I.retry(3).click(this.fields.submit);
  }
};
