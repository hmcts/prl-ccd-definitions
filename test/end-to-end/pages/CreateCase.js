const I = actor();

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    event: 'select[id="cc-event"]',
    submit: 'button[type="submit"]'
  },

  async clickCreateCase() {
    I.wait('7');
    await I.waitForText('Create case');
    I.wait('5');
    await I.click('Accept analytics cookies');
    I.wait('7');
    await I.click('Create case');
  },

  async fillFormAndSubmit() {
    const retryCount = 3;
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(this.fields.jurisdiction, 'Family Private Law');
    I.wait('3');
    await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    await I.retry(retryCount).selectOption(this.fields.event, 'Solicitor application');
    await I.waitForClickable(this.fields.submit);
    await I.click(this.fields.submit);
  },

  async selectTypeOfApplicationC100() {
    await I.waitForText('Type of application');
    await I.click('#caseTypeOfApplication-C100');
    await I.click('Continue');
  },

  async selectTypeOfApplicationFL401() {
    await I.waitForText('Type of application');
    await I.click('#caseTypeOfApplication-FL401');
    await I.click('Continue');
  },

  async fillSolicitorApplicationPageC100() {
    await I.waitForText('Confidentiality Statement');
    await I.click('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.click('Continue');

    await I.waitForElement('#applicantCaseName');
    await I.fillField('//input[@id="applicantCaseName"]', 'Test Child');
    await I.click('Continue');
  },

  async fillSolicitorApplicationPageFL401() {
    await I.waitForText('Confidentiality Statement');
    await I.click('#confidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.click('Continue');

    await I.waitForElement('#applicantOrRespondentCaseName');
    await I.fillField('#applicantOrRespondentCaseName', 'Applicant & Respondent');
    await I.click('Continue');
  },

  async createNewCaseC100() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async createNewCaseFL401() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationFL401();
    await this.fillSolicitorApplicationPageFL401();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
