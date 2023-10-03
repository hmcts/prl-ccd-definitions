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
    caseFromCourtNav_No: '#caseFromCourtNav_No',
    helpWithFees_No: '#helpWithFees_No',
  },

  async clickCreateCase() {
    I.wait('10');
    await I.waitForText('Create case');
    I.wait('10');
    await I.retry(retryCount).click(this.fields.createCaseLink);
  },

  async fillFormAndSubmit() {
    I.wait('30');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    I.wait('15');
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    I.wait('15');
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'Solicitor application'
    );
    await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },
  async fillFormAndSubmit_TS_Solicitor() {
    I.wait('5');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'TS-Solicitor application'
    );
    await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },
  async fillFormAndSubmit_TS() {
    I.wait('5');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'TS-Admin application-Noc'
    );
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('3');
  },

  async selectTypeOfApplicationC100() {
    // await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-C100');
    await I.retry(retryCount).click('Continue');
    await I.wait('3');
  },

  async selectTypeOfApplicationFL401() {
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-FL401');
    await I.retry(retryCount).click(this.fields.caseFromCourtNav_Yes);
    await I.retry(retryCount).click('Continue');
  },

  async fillSolicitorApplicationPageC100() {
    await I.waitForText('Confidentiality Statement');
    await I.retry(retryCount).click(
      '#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood'
    );
    await I.retry(retryCount).click('Continue');

    await I.waitForElement('#applicantCaseName');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField(
      '//input[@id="applicantCaseName"]',
      'Test Case C100'
    );
    await I.retry(retryCount).click('Continue');
  },

  async fillSolicitorApplicationPageFL401() {
    await I.waitForText('Confidentiality Statement');
    await I.retry(retryCount).click(
      '#confidentialityStatementDisclaimer-confidentialityStatementUnderstood'
    );
    await I.retry(retryCount).click('Continue');

    await I.waitForElement('#applicantOrRespondentCaseName');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField(
      '#applicantOrRespondentCaseName',
      'Test Case 1 DA 31'
    );
    await I.retry(retryCount).click('Continue');
  },

  async createNewCaseC100() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await this.submitEvent();
    // await this.amOnHistoryPageWithSuccessNotification();
  },
  async createNewCaseC100_TS() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TS_Solicitor();
    await this.selectTypeOfApplicationC100();
    await I.retry(retryCount).click('Create my dummy case');
    await I.wait('7');
  },
  async createC100CaseByCourtAdmin() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TS();
    await this.selectTypeOfApplicationC100();
    await I.retry(retryCount).click('Create my dummy case');
    await I.wait('10');
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
    await I.wait('5');
  },

  async amOnHistoryPageWithSuccessNotification() {
    await I.retry(retryCount).waitForText('History');
  },

  async createNewSolicitorDummyC100Case(){
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TSSolicitorApplication();
    await this.selectTypeOfApplicationC100();
    await I.retry(retryCount).click('Create my dummy case');
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async fillFormAndSubmit_TSSolicitorApplication() {
    I.wait('30');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(this.fields.jurisdiction, 'Family Private Law');
    I.wait('15');
    await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    I.wait('15');
    await I.retry(retryCount).selectOption(this.fields.event, 'TS-Solicitor application');
    await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  }
};
