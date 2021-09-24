const I = actor();

module.exports = {

  fields: {
    email: 'username',
    password: 'password',
    submit: 'input[type="submit"]'
  },

  async loginAsSolicitor() {
    await I.amOnPage('http://manage-case.aat.platform.hmcts.net');
    await I.click('#cookie-accept-submit');
    await I.seeElement('#authorizeCommand > div.form-section > div.login-list > input.button');
    await I.fillField(this.fields.email, 'fprl_caseworker_solicitor@mailinator.com');
    await I.fillField(this.fields.password, 'Nagoya0102');
    await I.click(this.fields.submit);
  }
};
