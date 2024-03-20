'use strict';
const I = actor();
const config = require('../config');

const retryCount = 3;
const normalizeCaseId = caseId => {
  return caseId.toString().replace(/\D/g, '');
};

module.exports = {

  fields: {
    email: '#username',
    password: '#password',
    submit: 'input[type="submit"]'
  },

  async loginAsSolicitor() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      await I.runAccessibilityTest();
      await I.seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserOne.password);
    } catch {
      await I.fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserOne.password);
    }
    await I.click(this.fields.submit);
  },
  async loginAsCourtAdmin() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    try {
      await I.runAccessibilityTest();
      await I.seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    } catch {
      await I.fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    }
    await I.click(this.fields.submit);
  },
  async loginAsCaseManager() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.runAccessibilityTest();
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.caseManagerUser.email);
    await I.fillField(this.fields.password, config.caseManagerUser.password);

    await I.click(this.fields.submit);
  },
  async loginAsJudge() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.wait('10');
    try {
      await I.runAccessibilityTest();
      await I.seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.judgeUserOne.email);
      await I.fillField(this.fields.password, config.judgeUserOne.password);
    } catch {
      await I.fillField(this.fields.email, config.judgeUserOne.email);
      await I.fillField(this.fields.password, config.judgeUserOne.password);
    }
    await I.click(this.fields.submit);
    await I.wait('10');
  },
  async loginAsLegalAdviser() {
    await I.wait('10');
    const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));
    await I.click('Sign out');
    await I.wait('5');
    const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);
    await I.amOnPage(pageUrl);
    try {
      await I.runAccessibilityTest();
      await I.seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.legalAdviserUserOne.email);
      await I.fillField(this.fields.password, config.legalAdviserUserOne.password);
    } catch {
      await I.fillField(this.fields.email, config.legalAdviserUserOne.email);
      await I.fillField(this.fields.password, config.legalAdviserUserOne.password);
    }
    await I.click(this.fields.submit);
    await I.wait('10');
  },
  async loginAsCourtAdminTSSolicitorApplication() {
    await I.wait('2');
    // const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));'1696262331763139'
    const caseId = '1696269921358857';
    // await I.retry(retryCount).click('Sign out');
    await I.wait('5');
    const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);
    await I.amOnPage(pageUrl);
    try {
      await I.runAccessibilityTest();
      await I.seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    } catch {
      await I.fillField(this.fields.email, config.legalProfessionalUserTwo.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('10');
  },

  async loginAsSolicitorNoCookiesDisplayed() {
    try {
      await I.seeElement('#authorizeCommand');
      await I.fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserOne.password);
    } catch {
      await I.fillField(this.fields.email, config.legalProfessionalUserOne.email);
      await I.fillField(this.fields.password, config.legalProfessionalUserOne.password);
    }
    await I.click(this.fields.submit);
    await I.wait('10');
  },

  async loginAsSwanseaCourtAdmin() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.runAccessibilityTest();
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.courtAdminUser.email);
    await I.fillField(this.fields.password, config.courtAdminUser.password);
    await I.click(this.fields.submit);
  },

  async loginAsRespondentSolicitor() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.runAccessibilityTest();
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.respondentSolicitor.email);
    await I.fillField(this.fields.password, config.respondentSolicitor.password);
    await I.click(this.fields.submit);
  },

  async loginAsOldCourtAdmin() {
    await I.amOnPage(`${process.env.XUI_WEB_URL}`);
    await I.runAccessibilityTest();
    await I.seeElement('#authorizeCommand');
    await I.fillField(this.fields.email, config.oldCourtAdminUser.email);
    await I.fillField(this.fields.password, config.oldCourtAdminUser.password);
    await I.click(this.fields.submit);
  }
};
