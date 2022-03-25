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
    await I.retry(3).click('Accept analytics cookies');
    I.wait('7');
    await I.retry(3).click('Create case');
  },

  async fillFormAndSubmit() {
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(3).selectOption(this.fields.jurisdiction, 'Family Private Law');
    I.wait('3');
    await I.retry(3).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    await I.retry(3).selectOption(this.fields.event, 'Solicitor application');
    await I.waitForClickable(this.fields.submit);
    await I.retry(3).click(this.fields.submit);
  },

  async selectTypeOfApplicationC100() {
    await I.waitForText('Type of application');
    await I.retry(3).click('#caseTypeOfApplication-C100');
    await I.retry(3).click('Continue');
  },

  async selectTypeOfApplicationFL401() {
    await I.waitForText('Type of application');
    await I.retry(3).click('#caseTypeOfApplication-FL401');
    await I.retry(3).click('Continue');
  },

  async fillSolicitorApplicationPageC100() {
    await I.waitForText('Confidentiality Statement');
    await I.retry(3).click('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(3).click('Continue');

    await I.waitForElement('#applicantCaseName');
    await I.retry(3).fillField('//input[@id="applicantCaseName"]', 'Test Child');
    await I.retry(3).click('Continue');
  },

  async fillSolicitorApplicationPageFL401() {
    await I.waitForText('Confidentiality Statement');
    await I.retry(3).click('#confidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(3).click('Continue');

    await I.waitForElement('#applicantOrRespondentCaseName');
    await I.retry(3).fillField('#applicantOrRespondentCaseName', 'Applicant & Respondent');
    await I.retry(3).click('Continue');
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
