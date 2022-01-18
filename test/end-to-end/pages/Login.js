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
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.click('#cookie-accept-submit');
    await I.click('#cookie-accept-all-success-banner-hide');
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.legalProfessionalUserOne.email);
    await I.fillField(this.fields.password, config.legalProfessionalUserOne.password);
    await I.click(this.fields.submit);
  }
};
