const I = actor();
const config = require('../config');

const retryCount = 3;
const normalizeCaseId = caseId => {
  return caseId.toString().replace(/\D/g, '');
};
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
    await I.wait('10');
  },
  async loginAsCourtAdmin(pageName) {
    await I.wait('2');
    // const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h1:first-child'));
    // await I.retry(retryCount).click('Sign out');
    const caseId = '1689692120579602';
    await I.wait('5');
    const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);
    await I.retry(retryCount).amOnPage(pageUrl);
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
    //
    // await I.retry(retryCount).selectTab(pageName);
    // await I.wait('5');
    // await I.retry(retryCount).click('Applications');
    // await I.wait('1');
    // await I.retry(retryCount).click('Respondent Documents');
    // await I.wait('1');
    // await I.retry(retryCount).click('Respondent C1A Response');
    // await I.wait('1');
    // await I.retry(retryCount).waitForText('dummy.pdf');
    // await I.retry(retryCount).click('dummy.pdf');
    // await I.wait('5');
  }
};
