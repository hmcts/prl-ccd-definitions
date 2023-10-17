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
    await I.wait('10');
    const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));
    await I.retry(retryCount).click('Sign out');
    await I.wait('5');
    const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);
    await I.retry(retryCount).amOnPage(pageUrl);
    try {
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
  async loginAsLegalAdviser() {
    await I.wait('10');
    const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));
    await I.retry(retryCount).click('Sign out');
    await I.wait('5');
    const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);
    await I.retry(retryCount).amOnPage(pageUrl);
    try {
      await I.runAccessibilityTest();
      await I.retry(retryCount).seeElement('#authorizeCommand');
      await I.retry(retryCount).fillField(this.fields.email, config.legalAdviserUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalAdviserUserOne.password);
    } catch {
      await I.retry(retryCount).fillField(this.fields.email, config.legalAdviserUserOne.email);
      await I.retry(retryCount).fillField(this.fields.password, config.legalAdviserUserOne.password);
    }
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('10');
  },
  async loginAsCourtAdminTSSolicitorApplication() {
    await I.wait('2');
    // const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));'1696262331763139'
    const caseId = '1696269921358857';
    // await I.retry(retryCount).click('Sign out');
    await I.wait('5');
    const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);
    await I.retry(retryCount).amOnPage(pageUrl);
    try {
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
  }
};
