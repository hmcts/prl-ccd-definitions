const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    pageTitle: 'Upload additional applications',
    applyingForQuestion: 'What are you applying for?',
    otherOrderCheckbox: '#additionalApplicationsApplyingFor-otherOrder',
    c2OrderCheckbox: '#additionalApplicationsApplyingFor-c2Order',
    applicantCheckbox: '//*[starts-with(@id,\'additionalApplicantsList_\')]',
    selectCAApplicationDropdown: '#temporaryOtherApplicationsBundle_caApplicantApplicationType',
    uploadApplicationFile: '#temporaryOtherApplicationsBundle_document',
    caseNameWithLabelElement: '//markdown/h2[1]',
    documentRelatedToText: 'Check if this document is related to',
    caseNameLength: 'Case Name:',
    tickToConfirmCheckbox: '#temporaryOtherApplicationsBundle_documentAcknowledge-ACK_RELATED_TO_CASE',
    within2DaysRadio: '#temporaryOtherApplicationsBundle_urgencyTimeFrameType-WITHIN_2_DAYS',
    awpFee: '//*[@id="additionalApplicationFeesToPayText"]/dt/ccd-markdown/div/markdown/p[2]',
    awphelpWithFees_Yes: '#additionalApplicationsHelpWithFees_Yes',
    awphelpWithFees_No: '#additionalApplicationsHelpWithFees_No',
    awphelpWithFeesReferenceNumber: '#additionalApplicationsHelpWithFeesNumber',
    awpHWFQuestion: 'Has the applicant applied for Help with Fees?',
    prlNoHWFText: 'Help with Fees is not yet available in the Family Private Law digital service.',
    HWFYesErrorMsg: 'Help with Fees is not yet available in Family Private Law digital ' +
      'service. Select \'No\' to continue with your application',
    HWFRefNum: 'ABC-123-DEF',
    serviceTab: '//div[contains(text(), "Service Request")]'
  },

  async triggerEvent() {
    await I.waitForElement('//option[contains(text(),"Upload additional applications")]');
    await I.retry(retryCount).triggerEvent('Upload additional applications');
  },

  async selectApplication() {
    await this.triggerEvent();
    await I.wait('8');
    await I.retry(retryCount).waitForText(this.fields.pageTitle);
    await I.retry(retryCount).waitForText(this.fields.applyingForQuestion);
    await I.retry(retryCount).click(this.fields.otherOrderCheckbox);
    await I.retry(retryCount).click(this.fields.applicantCheckbox);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('5');
  },

  async uploadApplication() {
    await I.retry(retryCount).selectOption(this.fields.selectCAApplicationDropdown, 'FC600 - Committal application');
    await I.retry(retryCount).attachFile(this.fields.uploadApplicationFile, '../resource/dummy.pdf');
    await I.retry(retryCount).click(this.fields.tickToConfirmCheckbox);
    await I.retry(retryCount).click(this.fields.within2DaysRadio);
    await I.wait('5');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('5');
  },
  async awpCAOtherOrders() {
    await this.selectApplication();
    await this.uploadApplication();
    await this.awpHelpWithFeeNo();
  },

  async awpHelpWithFeeNo() {
    await I.wait('2');
    await I.retry(retryCount).waitForText(this.fields.prlNoHWFText);
    await I.retry(retryCount).waitForText(this.fields.awpHWFQuestion);
    await I.retry(retryCount).waitForText('£167.00');
    await I.retry(retryCount).click(this.fields.awphelpWithFees_No);
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
    await I.retry(retryCount).click('Save and continue');
    await I.wait('12');
    await I.waitForText('Continue to payment');
    await I.runAccessibilityTest();
    await I.click('Close and Return to case details');
    await I.click(this.fields.serviceTab);
    await I.wait('10');
    await I.waitForText('£232.00');
    await I.see('John Doe Vs Mary Richards v2');
  },
  async submitAndPay_HWF_Yes() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeYes();
  }
};
