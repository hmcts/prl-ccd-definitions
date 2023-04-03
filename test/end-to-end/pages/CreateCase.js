const I = actor();
const retryCount = 3;
const normalizeCaseId = caseId => {
  return caseId.toString().replace(/\D/g, '');
};

module.exports = {

  fields: {
    jurisdiction: 'select[id="cc-jurisdiction"]',
    caseType: 'select[id="cc-case-type"]',
    event: 'select[id="cc-event"]',
    createCaseLink: '//a[contains(.,"Create case")]',
    submit: 'button[type="submit"]',
    caseFromCourtNav_Yes: '#caseFromCourtNav_Yes',
    caseFromCourtNav_No: '#caseFromCourtNav_No'
  },

  async clickCreateCase() {
    I.wait('7');
    await I.waitForText('Create case');
    I.wait('7');
    await I.retry(retryCount).click(this.fields.createCaseLink);
  },

  async fillFormAndSubmit() {
    I.wait('5');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(this.fields.jurisdiction, 'Family Private Law');
    I.wait('5');
    await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    I.wait('5');
    await I.retry(retryCount).selectOption(this.fields.event, 'Solicitor application');
    // await I.retry(retryCount).selectFromList(this.fields.jurisdiction, 'Family Private Law');
    // await I.selectFromList(this.fields.caseType, 'C100 & FL401 Applications');
    // await I.selectFromList(this.fields.event, 'Solicitor application');
    await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async selectTypeOfApplicationC100() {
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-C100');
    await I.retry(retryCount).click('Continue');
  },

  async selectTypeOfApplicationFL401() {
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-FL401');
    await I.retry(retryCount).click(this.fields.caseFromCourtNav_Yes);
    await I.retry(retryCount).click('Continue');
  },

  async fillSolicitorApplicationPageC100() {
    await I.waitForText('Confidentiality Statement');
    await I.retry(retryCount).click('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(retryCount).click('Continue');

    await I.waitForElement('#applicantCaseName');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField('//input[@id="applicantCaseName"]', 'Test Case C100');
    await I.retry(retryCount).click('Continue');
  },

  async fillSolicitorApplicationPageFL401() {
    await I.waitForText('Confidentiality Statement');
    await I.retry(retryCount).click('#confidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(retryCount).click('Continue');

    await I.waitForElement('#applicantOrRespondentCaseName');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField('#applicantOrRespondentCaseName', 'Test Case 1 DA 31');
    await I.retry(retryCount).click('Continue');
  },

  async createNewCaseC100() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await this.submitEvent();
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createNewCaseFL401() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationFL401();
    await this.fillSolicitorApplicationPageFL401();
    await this.submitEvent();
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createNewCaseC100andReturnID() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await this.submitEvent();
    await this.amOnHistoryPageWithSuccessNotification();
    const caseId = normalizeCaseId(await I.grabTextFrom('.alert-message'));
    return caseId;
  },

  async submitEvent() {
    I.wait('2');
    await I.retry(retryCount).waitForElement('h2');
    await I.retry(retryCount).see('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },

  async amOnHistoryPageWithSuccessNotification() {
    await I.retry(retryCount).waitForText('History');
  }
};
