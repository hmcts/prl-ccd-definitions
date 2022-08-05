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

  async loginAsCourtAdmin() {
    try {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.emailCourtAdmin);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password2);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.emailCourtAdmin);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password2);
    }
    await I.retry(retryCount).click(this.fields.submit);
  }
};
