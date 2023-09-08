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
    caseNameWithLabel: '//markdown/h2[1]',
    documentRelatedToText: 'Check if this document is related to ',
    caseNameLength: 'Case Name:',
    tickToConfirmCheckbox: '#temporaryOtherApplicationsBundle_documentAcknowledge-ACK_RELATED_TO_CASE',
    within2DaysRadio: '#temporaryOtherApplicationsBundle_urgencyTimeFrameType-WITHIN_2_DAYS',
    helpWithFees_Yes: '#helpWithFees_Yes',
    helpWithFees_No: '#helpWithFees_No',
    helpWithFeesReferenceNumber_text: '#helpWithFeesReferenceNumber',
    HWFQuestion: 'Has the applicant applied for Help with Fees?',
    prlNoHWFText: 'Help with Fees is not yet available in the Family Private Law digital service.',
    HWFYesErrorMsg: 'Help with Fees is not yet available in Family Private Law digital ' +
      'service. Select \'No\' to continue with your application',
    HWFRefNum: 'ABC-123-DEF'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Upload additional applications');
  },

  async selectApplication(){
    await this.triggerEvent();
    await I.wait('3');
    await I.retry(retryCount).waitForText(this.fields.pageTitle);
    await I.retry(retryCount).waitForText(this.fields.applyingForQuestion);
    await I.retry(retryCount).click(this.fields.otherOrderCheckbox);
    await I.retry(retryCount).click(this.fields.applicantCheckbox);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },

  async uploadApplication() {
    await I.retry(retryCount).attachFile(this.fields.selectCAApplicationDropdown, '../resource/dummy.pdf');
    const caseName = this.fields.caseNameWithLabel.substring(this.fields.caseNameLength.length);
    await I.retry(retryCount).waitForText(this.fields.documentRelatedToText.concat(caseName));
    await I.retry(retryCount).click(this.fields.tickToConfirmCheckbox);
    await I.retry(retryCount).click(this.fields.within2DaysRadio);
    await I.retry(retryCount).click('Continue');
    await I.wait('5');
  },

  // async helpWithFeeNo() {
  //   await I.wait('2');
  //   await I.retry(retryCount).waitForText(this.fields.HWFQuestion);
  //   await I.retry(retryCount).click(this.fields.helpWithFees_No);
  //   await I.wait('1');
  //   await I.retry(retryCount).click('Continue');
  //   await I.wait('2');
  //   await I.retry(retryCount).click(this.fields.submit);
  //   await I.wait('6');
  //   await I.retry(retryCount).waitForText('Continue to payment');
  //   await I.retry(retryCount).click('Close and Return to case details');
  //   await I.wait('2');
  // },
  // async helpWithFeeYes() {
  //   await I.wait('2');
  //   await I.retry(retryCount).waitForText(this.fields.HWFQuestion);
  //   await I.retry(retryCount).click(this.fields.helpWithFees_Yes);
  //   await I.wait('1');
  //   await I.retry(retryCount).fillField(this.fields.helpWithFeesReferenceNumber_text, this.fields.HWFRefNum);
  //   await I.retry(retryCount).click('Continue');
  //   await I.wait('2');
  //   await I.retry(retryCount).waitForText(this.fields.HWFYesErrorMsg);
  // },
  async submitAndPay_HWF_Yes() {
    await this.triggerEvent();
    await this.confidentialityStatement();
    await this.declaration();
    await this.helpWithFeeYes();
  }
};
