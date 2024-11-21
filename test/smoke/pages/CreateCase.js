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
    submitCountyCourtSelection: 'select[id="submitCountyCourtSelection"]'
  },

  async clickCreateCase() {
    I.wait('60');
    await I.waitForText('Create case');
    I.wait('30');
    await I.retry(retryCount).click(this.fields.createCaseLink);
  },

  async fillFormAndSubmit() {
    I.wait('5');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(this.fields.jurisdiction, 'Family Private Law');
    // I.wait('5');
    await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    await I.retry(retryCount).selectOption(this.fields.event, 'Solicitor application');
    await I.seeElement(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async selectTypeOfApplicationC100() {
    await I.waitForText('Type of application');
    await I.seeElement('#caseTypeOfApplication-C100');
    await I.retry(retryCount).click('#caseTypeOfApplication-C100');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillSolicitorApplicationPageC100() {
    await I.waitForText('Confidentiality Statement');
    await I.seeElement('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(retryCount).click('#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood');
    await I.retry(retryCount).click(this.fields.submit);

    I.wait('5');
    await I.waitForText('Select the family court');
    await I.waitForElement(this.fields.submitCountyCourtSelection);
    await I.retry(retryCount).selectOption(this.fields.submitCountyCourtSelection
      , 'Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP');
    await I.seeElement(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);


    await I.waitForElement('#applicantCaseName');
    await I.retry(retryCount).fillField('//input[@id="applicantCaseName"]', 'Smoke Test Case');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async createNewCaseC100andReturnID() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    const caseId = normalizeCaseId(await I.grabTextFrom('.markdown > h2:nth-child(3)'));
    return caseId;
  }
};
