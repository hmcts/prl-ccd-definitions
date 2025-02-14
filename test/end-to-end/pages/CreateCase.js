const I = actor();
const retryCount = 3;
const config = require('../config');
const testLogger = require('../helpers/testLogger');

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
    signOut: '//a[contains(.,"Sign out")]',
    email: '#username',
    password: '#password',
    submitOther: 'input[type="submit"]',
    selectFamilyCourt: 'select[id="submitCountyCourtSelection"]'
  },


  async getCaseIDFromCaseDetailsPage() {
    const h2CaseIdText = await I.grabTextFrom('//ccd-case-header//h2[3]');
    let caseId = h2CaseIdText.split(':')[1];
    caseId = caseId.trim().split('-');
    caseId = caseId.join('');
    console.log(caseId);
    testLogger.AddMessage(`Case ID: ${caseId}`);
    return caseId;
  },

  async clickCreateCase() {
    global.logCallingFunction();
    await I.wait('40');
    await I.waitForSelector(this.fields.createCaseLink);
    await I.retry(retryCount).click(this.fields.createCaseLink);
    await I.waitForElement(this.fields.jurisdiction);
  },

  async fillFormAndSubmit() {
    global.logCallingFunction();
    await I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    await I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    await I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'Solicitor application'
    );
    await I.retry(retryCount).click(this.fields.submit);
  },
  async fillFormAndSubmit_TS_Solicitor() {
    global.logCallingFunction();
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'TS-Solicitor application'
    );
    await I.retry(retryCount).click(this.fields.submit);
  },
  async fillFormAndSubmit_TS() {
    global.logCallingFunction();
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    await I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'TS-Admin application-Noc'
    );
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillFormAndSubmitCourtNav_TS() {
    global.logCallingFunction();
    await I.retry(retryCount).selectOption(
      this.fields.jurisdiction,
      'Family Private Law'
    );
    await I.retry(retryCount).selectOption(
      this.fields.caseType,
      'C100 & FL401 Applications'
    );
    await I.wait('5');
    await I.retry(retryCount).selectOption(
      this.fields.event,
      'TS-CourtNav application'
    );
    await I.retry(retryCount).click(this.fields.submit);
  },

  async selectTypeOfAdminNocApplicationC100() {
    global.logCallingFunction();
    // await I.waitForText('TS-Admin application-Noc');
    await I.retry(retryCount).click('#caseTypeOfApplication-C100');
    await I.retry(retryCount).continueEvent();

    await I.waitForSelector('#applicantCaseName');
    await I.fillField('#applicantCaseName', 'auto test C100');
    await I.retry(retryCount).continueEvent();
    // await I.wait('3');
  },

  async fillFormAndSubmit_CourtAdmin() {
    I.wait('5');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(this.fields.jurisdiction, 'Family Private Law');
    I.wait('5');
    await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    I.wait('5');
    await I.retry(retryCount).selectOption(this.fields.event, 'Court admin application');
    await I.retry(retryCount).click(this.fields.submit);
    await I.wait('3');
  },

  async selectTypeOfApplicationC100() {
    global.logCallingFunction();
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-C100');
    await I.retry(retryCount).continueEvent();
  },

  async selectTypeOfApplicationFL401() {
    global.logCallingFunction();
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-FL401');
    await I.retry(retryCount).click(this.fields.caseFromCourtNav_Yes);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },
  async selectTypeOfApplicationFL401_TS() {
    global.logCallingFunction();
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-FL401');
    await I.retry(retryCount).continueEvent();
  },

  async selectTypeOfApplicationFL401DummyCase() {
    global.logCallingFunction();
    await I.waitForText('Type of application');
    await I.retry(retryCount).click('#caseTypeOfApplication-FL401');
    await I.retry(retryCount).continueEvent();

    await I.waitForText('TS-Solicitor aplication');
    await I.fillField('#applicantCaseName', 'auto test C100');
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },

  async fillSolicitorApplicationPageC100() {
    global.logCallingFunction();
    // await I.waitForText('Confidentiality Statement');
    await I.retry(retryCount).click(
      '#c100ConfidentialityStatementDisclaimer-confidentialityStatementUnderstood'
    );
    await I.retry(retryCount).continueEvent();
  },

  async fillSolicitorFamilyCourt() {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText('Select the family court')
    await I.retry(retryCount).waitForElement(this.fields.selectFamilyCourt);
    await I.retry(retryCount).selectOption(
      this.fields.selectFamilyCourt,
      'Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP'
    );
    await I.retry(retryCount).continueEvent();
  },

  async fillSolicitorCaseName() {

    await I.waitForElement('#applicantCaseName');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField(
      '//input[@id="applicantCaseName"]',
      'Test Case C100'
    );
    await I.retry(retryCount).continueEvent();
  },

  async fillSolicitorApplicationPageFL401() {
    global.logCallingFunction();
    await I.waitForText('Confidentiality Statement');
    await I.retry(retryCount).click(
      '#confidentialityStatementDisclaimer-confidentialityStatementUnderstood'
    );
    await I.retry(retryCount).continueEvent();
  },

  async fillSolicitorCaseNameFL401() {
  await I.waitForElement('#applicantOrRespondentCaseName');
  await I.runAccessibilityTest();
  await I.retry(retryCount).fillField(
    '#applicantOrRespondentCaseName',
    'Test Case 1 DA 31'
  );
  await I.retry(retryCount).continueEvent();
  },

  async createNewCaseC100() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await this.fillSolicitorFamilyCourt();
    await this.fillSolicitorCaseName();
    await this.submitEvent();
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createC100UrgentCaseByCourtAdmin() {
    await this.clickCreateCase();
    await this.fillFormAndSubmit_CourtAdmin();
    await this.selectTypeOfApplicationC100();
    await this.fillSolicitorApplicationPageC100();
    await this.submitEvent();
    await I.wait('10');
  },
  async createNewCaseC100_TS() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TS_Solicitor();
    await this.selectTypeOfApplicationC100();
    await I.waitForText('TS-Solicitor application');
    await I.waitForSelector('#applicantCaseName');
    await I.fillField('#applicantCaseName', 'auto test C100');
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).click('Create my dummy case');
    await I.wait('7');
  },
  async createNewCaseFL401_TS() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TS_Solicitor();
    await this.selectTypeOfApplicationFL401_TS();
    await I.retry(retryCount).click('Create my dummy case');
    await I.wait('7');
  },
  async createC100CaseByCourtAdmin() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TS();
    await this.selectTypeOfAdminNocApplicationC100();
    await I.click('Create my dummy case');
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createFL401CaseByCourtAdmin() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmitCourtNav_TS();
    await I.click('Create my dummy case');
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createNewCaseFL401() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit();
    await this.selectTypeOfApplicationFL401();
    await this.fillSolicitorApplicationPageFL401();
    await this.fillSolicitorFamilyCourt();
    await this.fillSolicitorCaseNameFL401();
    await this.submitEvent();
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createNewCaseC100andReturnID() {
    global.logCallingFunction();
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
    global.logCallingFunction();
    // I.wait('2');
    // await I.retry(retryCount).waitForElement('h2');
    await I.retry(retryCount).see('Check your answers');
    await I.retry(retryCount).click('Save and continue');
    // await I.wait('5');
  },

  async amOnHistoryPageWithSuccessNotification() {
    global.logCallingFunction();
    await I.retry(retryCount).waitForText('History');
  },

  async createNewSolicitorDummyC100Case() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TSSolicitorApplication();
    await this.selectTypeOfApplicationC100();

    await I.waitForText('TS-Solicitor application');
    await I.waitForSelector('#applicantCaseName');

    await I.fillField('#applicantCaseName', 'auto test C100');
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).click('Create my dummy case');
    await this.amOnHistoryPageWithSuccessNotification();
  },

  async createNewSolicitorDummyFL401Case() {
    global.logCallingFunction();
    await this.clickCreateCase();
    await this.fillFormAndSubmit_TSSolicitorApplication();
    await this.selectTypeOfApplicationFL401DummyCase();
    await I.retry(retryCount).click('Create my dummy case');
    await I.wait('3');
  },

  async fillFormAndSubmit_TSSolicitorApplication() {
    global.logCallingFunction();
    // await I.wait('15');
    await I.waitForElement(this.fields.jurisdiction);
    await I.retry(retryCount).selectOption(this.fields.jurisdiction, 'Family Private Law');
    // I.wait('15');
    await I.retry(retryCount).selectOption(this.fields.caseType, 'C100 & FL401 Applications');
    // I.wait('15');
    await I.retry(retryCount).selectOption(this.fields.event, 'TS-Solicitor application');
    // await I.waitForClickable(this.fields.submit);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async saveTheCaseIdAndSignInAsSwanseaCourtAdmin() {
    // I.wait('20');
    global.logCallingFunction();

    const caseId = await this.getCaseIDFromCaseDetailsPage();

    // const caseId = normalizeCaseId(await I.grabTextFrom('.alert-message'));
    console.log(caseId);
    await I.retry(retryCount).click(this.fields.signOut);
    // await I.wait('10');
    await I.retry(retryCount).seeElement('#authorizeCommand');
    testLogger.AddMessage(`Login with user : ${config.courtAdminUser.email}`);
    await I.retry(retryCount).fillField(this.fields.email, config.courtAdminUser.email);
    await I.retry(retryCount).fillField(this.fields.password, config.courtAdminUser.password);
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.submitOther);
    await I.wait('10');
    return caseId;
  },

  async saveTheCaseIdAndSignInAsStokeCourtAdmin() {
    // I.wait('20');
    global.logCallingFunction();
    const caseId = await this.getCaseIDFromCaseDetailsPage();
    // const caseId = normalizeCaseId(await I.grabTextFrom('.alert-message'));
    console.log(caseId);
    await I.retry(retryCount).click(this.fields.signOut);
    // await I.wait('10');
    await I.retry(retryCount).seeElement('#authorizeCommand');
    testLogger.AddMessage(`Login with user : ${config.legalProfessionalUserTwo.email}`);
    await I.retry(retryCount).fillField(this.fields.email, config.legalProfessionalUserTwo.email);
    await I.retry(retryCount).fillField(this.fields.password, config.legalProfessionalUserTwo.password);
    await I.wait('5');
    await I.retry(retryCount).click(this.fields.submitOther);
    await I.wait('10');
    return caseId;
  },

  async saveTheCaseId() {
    global.logCallingFunction();
    const caseId = await this.getCaseIDFromCaseDetailsPage();
    // const caseId = normalizeCaseId(await I.grabTextFrom('.alert-message'));
    console.log(caseId);
    return caseId;
  }


};
