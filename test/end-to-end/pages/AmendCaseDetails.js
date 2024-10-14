const I = actor();
const retryCount = 3;

module.exports = {

  amendRespondentEvent: {
    legalRepQuestionText: '*Do they have legal representation? (Optional)',
    repFirstNameQuestionText: '*Representative\'s first name (Optional)',
    repFirstName: 'Resp rep fname',
    repLastName: 'Resp rep lname',
    repEmail: 'rep@test.com',
    dxNumber: 'DX-12345678'
  },

  fields: {
    submit: 'button[type="submit"]',
    applicantName: '#applicants_0_firstName',
    claimingExceptionNo: '#mpuChildInvolvedInMiam_No',
    attendMianYes: '#mpuApplicantAttendedMiam_Yes',
    urn: '#mediatorRegistrationNumber',
    mediatorName: '#familyMediatorServiceName',
    soleTraderName: '#soleTraderName',
    uploadCertificate: '#miamCertificationDocumentUpload',
    applicationTab: '//div[contains(text(), "Application")]',
    headerText: 'Amend Respondent details',
    textareaText: 'Respondent details',
    respondentAddress: 'respondents_0_address_address',
    respondentAddressFL401: 'respondentsFL401_address_address',
    organisation: 'AAT',
    tabSelector: '//div[contains(text(), "Parties_")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron',
    respAddressConfidentialNo: '#respondentsFL401_isAddressConfidential_No',
    respEmailConfidentialNo: '#respondentsFL401_isEmailAddressConfidential_No',
    respMobileConfidentialNo: '#respondentsFL401_isPhoneNumberConfidential_No',
    respLARepYes: '#respondentsFL401_doTheyHaveLegalRepresentation-yes',
    repFNameField: '#respondentsFL401_representativeFirstName',
    repLNameField: '#respondentsFL401_representativeLastName',
    repEmailField: '#respondentsFL401_solicitorEmail',
    repDXNumField: '#respondentsFL401_dxNumber'
  },

  async triggerEvent() {
    await I.triggerEvent('Amend MIAM');
  },

  async updateMiamDetails() {
    await I.waitForText('*Are the children involved in any emergency protection, care or supervision proceedings (or have the');
    await I.click(this.fields.claimingExceptionNo);
    await I.waitForText('*Has the applicant attended a Mediation Information & Assessment Meeting (MIAM)?');
    await I.click(this.fields.attendMianYes);
    await I.dontSee('*Is the applicant claiming exemption from the requirement to attend a MIAM ?');
    await I.runAccessibilityTest();
    await I.click(this.fields.submit);
  },

  async addMiamCertificationDetails() {
    await I.waitForText('Enter details of MIAM certification');
    await I.fillField(this.fields.urn, '12345678');
    await I.fillField(this.fields.mediatorName, 'Test mediator name');
    await I.fillField(this.fields.soleTraderName, 'Test sole trader name');
    await I.attachFile(this.fields.uploadCertificate, '../resource/dummy.pdf');
    await I.wait('10');
    await I.runAccessibilityTest();
    await I.continueEvent();

    await I.waitForText('Check your answers');
    await I.click('Save and continue');
  },

  async verifyUpdatedMiamDetails() {
    await I.waitForElement(this.fields.applicationTab);
    await I.retry(retryCount).click(this.fields.applicationTab);
    await I.waitForText('Are the children involved in any emergency protection, care or supervision proceedings');
    // await I.runAccessibilityTest();
    await I.see('12345678');
    await I.see('Test mediator name');
    await I.see('Test sole trader name');
  },

  async updateApplicantMIAMInfo() {
    await this.triggerEvent();
    await this.updateMiamDetails();
    await this.addMiamCertificationDetails();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifyUpdatedMiamDetails();
  },

  async searchAndSelectGivenRegisteredOrganisation() {
    await I.waitForEnabled('#search-org-text');
    await I.wait('2');
    await I.fillField('#search-org-text', this.fields.organisation);
    await I.wait('2');
    await I.click(locate('a').withText('Select')
      .inside(locate('#organisation-table')));
  },

  async amendRespondentDetails() {
    await I.waitForPage('h1', this.fields.headerText);

    await I.click(this.fields.respAddressConfidentialNo);
    await I.click(this.fields.respEmailConfidentialNo);
    await I.click(this.fields.respMobileConfidentialNo);

    await I.see(this.amendRespondentEvent.legalRepQuestionText);
    await I.checkOption(this.fields.respLARepYes);
    await I.waitForText(this.amendRespondentEvent.repFirstNameQuestionText);
    await I.fillField(this.fields.repFNameField, this.amendRespondentEvent.repFirstName);
    await I.fillField(this.fields.repLNameField, this.amendRespondentEvent.repLastName);
    await I.fillField(this.fields.repEmailField, this.amendRespondentEvent.repEmail);
    await this.searchAndSelectGivenRegisteredOrganisation();

    await I.fillField(this.fields.repDXNumField, this.amendRespondentEvent.dxNumber);

    await I.runAccessibilityTest();
    await I.continueEvent();

    await I.waitForText('Check your answers');
    await I.click('Save and continue');
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async verifyUpdatedRespondentDetails() {
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.tabSelector);
    await I.waitForText('Respondent Solicitor');
    await I.runAccessibilityTest();
    await I.see(this.amendRespondentEvent.repFirstName);
    await I.see(this.amendRespondentEvent.repLastName);
    await I.see(this.amendRespondentEvent.repEmail);
    await I.see(this.amendRespondentEvent.dxNumber);
  },

  async updateDARespondentDetails() {
    await I.triggerEvent('Amend respondent details');
    await this.amendRespondentDetails();
    await this.verifyUpdatedRespondentDetails();
  }
};
