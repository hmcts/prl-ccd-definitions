'use strict';
const I = actor();
const config = require('../config');

const retryCount = 3;
// const normalizeCaseId = caseId => {
//   return caseId.toString().replace(/\D/g, '');
// };
// eslint-disable-next-line no-unused-vars
// const baseUrl = config.baseUrl;

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
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    // await I.wait('10');
  },
  async loginAsCourtAdmin() {
    await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      await I.retry(retryCount).click('#cookie-accept-submit');
      await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    // await I.wait('10');
  },
  async loginAsJudge() {
    await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      await I.retry(retryCount).click('#cookie-accept-submit');
      await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.judgeUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.judgeUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.judgeUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.judgeUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('10');
  },
  async loginAsCourtAdminTSSolicitorCreate() {
    await I.wait('2');
    // const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));
    await I.retry(retryCount).click('Sign out');
    // await I.retry(retryCount).amOnPage(`${`${process.env.XUI_WEB_URL}` + '/case-details/'}${caseId}`);
    try {
      // await I.retry(retryCount).click('#cookie-accept-submit');
      // await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('10');
  },

  async loginAsSolicitorNoCookiesDisplayed() {
    try {
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('10');
  },

  async loginAsSwanseaCourtAdmin() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.click('#cookie-accept-submit');
    await I.click('#cookie-accept-all-success-banner-hide');
    await I.runAccessibilityTest();
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.courtAdminUser.email);
    await I.fillField(this.fields.password, config.courtAdminUser.password);
    await I.click(this.fields.submit);
  },

  async loginAsRespondentSolicitor() {
    await I.retry(retryCount).amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.retry(retryCount).click('#cookie-accept-submit');
    await I.retry(retryCount).click('#cookie-accept-all-success-banner-hide');
    await I.runAccessibilityTest();
    await I.retry(retryCount).seeElement('#authorizeCommand');
    await I.retry(retryCount).fillField(this.fields.email, config.respondentSolicitor.email);
    await I.retry(retryCount).fillField(this.fields.password, config.respondentSolicitor.password);
    await I.click(this.fields.submit);
  },

  async loginAsCaseManager() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.click('#cookie-accept-submit');
    await I.click('#cookie-accept-all-success-banner-hide');
    await I.runAccessibilityTest();
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.caseManagerUser.email);
    await I.fillField(this.fields.password, config.caseManagerUser.password);
    await I.click(this.fields.submit);
    await I.wait('10');
  }
};
