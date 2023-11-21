const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    applicantName: '#applicants_0_firstName',
    claimingExceptionNo: '#claimingExemptionMiam_No',
    attendMianYes: '#applicantAttendedMiam_Yes',
    urn: '#mediatorRegistrationNumber',
    mediatorName: '#familyMediatorServiceName',
    soleTraderName: '#soleTraderName',
    uploadCertificate: '#miamCertificationDocumentUpload',
    applicationTab: '//div[contains(text(), "Application")]'
  },

  async triggerEvent() {
    await I.triggerEvent('Amend MIAM');
  },

  async updateMiamDetails() {
    await I.waitForText('*Has the applicant attended a Mediation information & Assessment Meeting (MIAM)?');

    await I.click(this.fields.claimingExceptionNo);
    await I.dontSee('*Has a family mediator informed the applicant that a mediator’s exemption applies, and they do not need to attend a MIAM ?');

    await I.click(this.fields.attendMianYes);
    await I.dontSee('*Is the applicant claiming exemption from the requirement to attend a MIAM ?');

    await I.click(this.fields.submit);
  },

  async addMiamCertificationDetails() {
    await I.waitForText('Enter details of MIAM certification');
    await I.fillField(this.fields.urn, '12345678');
    await I.fillField(this.fields.mediatorName, 'Test mediator name');
    await I.fillField(this.fields.soleTraderName, 'Test sole trader name');
    await I.attachFile(this.fields.uploadCertificate, '../resource/dummy.pdf');
    await I.wait('10');
    await I.click('Continue');

    await I.waitForText('Check your answers');
    await I.click('Save and continue');
  },

  async verifyUpdatedMiamDetails() {
    await I.click(this.fields.applicationTab);
    await I.waitForText('Has the applicant attended MIAM?');
    await I.see('12345678');
    await I.see('Test mediator name');
    await I.see('Test sole trader name');
  },

  async updateApplicationInfo() {
    await this.triggerEvent();
    await this.updateMiamDetails();
    await this.addMiamCertificationDetails();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
