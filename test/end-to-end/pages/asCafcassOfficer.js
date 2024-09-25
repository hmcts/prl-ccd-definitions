const I = actor();

module.exports = {
  fields: {
    'Full Name': '//span[contains(text(),"Full Name")]/../../input',
    'Email address': '//span[contains(text(),"Email address")]/../../input',
    'Phone number': '//span[contains(text(),"Phone number")]/../../input',
    'Position in the case': '//span[contains(text(),"Position in the case")]/../../select',
    'Yes, the document belongs to the case': '//label[contains(text(),"Yes, the document belongs to the case")]/../input',
    'Submitting document on behalf of': '//span[contains(text(),"Submitting document on behalf of")]/../../select',
    'Document category': '//span[contains(text(),"Document category")]/../../select'
  },

  async verifyCaseDetailsCafcassField(name, value) {
    const locator = `//span[contains(text(),"${name}")]/../../td//span[contains(text(),"${value}")]`;
    await I.seeElement(locator);
  },

  async triggerEvent(eventName) {
    await I.triggerEvent(eventName);
  },

  async fillDetailsAndSubmit_AddCafcassOfficer() {
    await I.fillField(this.fields['Full Name'], 'testofficer');
    await I.fillField(this.fields['Email address'], 'testofficer@cafcass.com');
    await I.fillField(this.fields['Phone number'], '09876543211');

    await I.selectOption(this.fields['Position in the case'], 'Cafcass officer');

    await I.continueEvent('Continue');

    await I.waitForText('Check your answers');

    await I.see('testofficer');
    await I.see('testofficer@cafcass.com');
    await I.see('Cafcass officer');
    await I.see('09876543211');

    await I.submitEvent('Save and continue');

    await I.waitForText('has been updated with event: Add cafcass officer');
  },

  async fillDetailsAndSubmit_ManageDocuments() {
    await I.waitForText('Add a document');
    await I.checkOption(this.fields['Yes, the document belongs to the case']);
    await I.selectOption(this.fields['Submitting document on behalf of'], 'Applicant');
    await I.selectOption(this.fields['Document category'], 'Applicant application');
    await I.click('#manageDocuments_0_isConfidential_No');
    await I.click('#manageDocuments_0_isRestricted_No');
    await I.attachFile('#manageDocuments_0_document', '../resource/dummy.pdf');
    await I.wait('5');

    await I.continueEvent('Continue');
    await I.waitForText('Check your answers');
    await I.see('Yes, the document belongs to the case');
    await I.see('Applicant');
    await I.see('Applicant application');
    await I.submitEvent();
    await I.waitForText('Documents submitted');
    await I.click('Close and Return to case details');
    await I.waitForText('has been updated with event: Manage documents');
  },

  async performEventAddCafcassOfficer() {
    await this.triggerEvent('Add cafcass officer');
    await this.fillDetailsAndSubmit_AddCafcassOfficer();
  },

  async verifyPartiesAddedCafcassofficerDetails() {
    await I.click('//div[contains(@class,"mat-tab-label-content")][contains(text(),"Parties")]');
    await I.waitForElement('//markdown//h2[contains(text(),"Children")]');

    await I.see('Cafcass officer');
    await this.verifyCaseDetailsCafcassField('Name of CAFCASS(Cymru) OFFICER', 'testofficer');
    await this.verifyCaseDetailsCafcassField('Email Address', 'testofficer@cafcass.com');
    await this.verifyCaseDetailsCafcassField('Telephone number', '09876543211');
  },

  async performEventManageDocuments() {
    await this.triggerEvent('Manage documents');
    await this.fillDetailsAndSubmit_ManageDocuments();
  },

  async verifyCaseDocumentsCafcassUploadedDocuments() {
    await I.click('//div[contains(@class,"mat-tab-label-content")][contains(text(),"Case documents")]');
    await I.waitForText('Cafcass uploaded documents');
    await this.verifyCaseDetailsCafcassField('Document category', 'Applicant application');
    await this.verifyCaseDetailsCafcassField('Submitted by', 'Applicant');
    await this.verifyCaseDetailsCafcassField('Uploaded by', 'Prl CAFCASS');
    await I.seeElement('//span[contains(text(),"Document")]/../../td//a[contains(text(),"dummy.pdf")]');
  }
};
