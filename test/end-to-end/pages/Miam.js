const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    whyNotAttending: 'Why is the applicant not attending a MIAM? (Optional)',
    whatEvidence: '*What evidence of domestic abuse does the applicant have? (Optional)',
    checkList1: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_1',
    checkList2: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_2',
    checkList3: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_3',
    checkList4: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_4',
    checkList5: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_5',
    checkList6: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_6',
    checkList7: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_7',
    checkList8: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_8',
    checkList9: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_9',
    checkList10: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_10',
    checkList11: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_11',
    checkList12: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_12',
    checkList13: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_13',
    checkList14: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_14',
    checkList15: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_15',
    checkList16: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_16',
    checkList17: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_17',
    checkList18: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_18',
    checkList19: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_19',
    checkList20: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_20',
    checkList21: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_21',
    checkList22: '#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_22',
    addNew: 'Add new',
    details: 'James'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('MIAM');
  },

  // Are the children involved in any emergency protection, care or supervision proceedings
  async fillMIAMEmergencyProtectionPage() {
    await I.wait('6');
    await I.retry(retryCount).waitForElement('#mpuChildInvolvedInMiam_No');
    await I.retry(retryCount).checkOption('#mpuChildInvolvedInMiam_No');
    await I.retry(retryCount).waitForElement('#mpuApplicantAttendedMiam_No');
    await I.retry(retryCount).checkOption('#mpuApplicantAttendedMiam_No');
    await I.retry(retryCount).waitForElement('#mpuClaimingExemptionMiam_Yes');
    await I.retry(retryCount).checkOption('#mpuClaimingExemptionMiam_Yes');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMEmergencyDifferentFlow() {
    await I.wait('6');
    await I.retry(retryCount).waitForElement('#mpuChildInvolvedInMiam_No');
    await I.retry(retryCount).checkOption('#mpuChildInvolvedInMiam_No');
    await I.retry(retryCount).waitForElement('#mpuApplicantAttendedMiam_Yes');
    await I.retry(retryCount).checkOption('#mpuApplicantAttendedMiam_Yes');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMCertificationPage() {
    const uploadTime = 5;
    await I.wait('6');
    await I.retry(retryCount).waitForElement('//input[@id="mediatorRegistrationNumber"]');
    await I.retry(retryCount).fillField('//input[@id="mediatorRegistrationNumber"]', 'URN12345');
    await I.retry(retryCount).fillField('//input[@id="familyMediatorServiceName"]', 'Test service name');
    await I.retry(retryCount).fillField('//input[@id="soleTraderName"]', 'Test sole trader');
    await I.retry(retryCount).attachFile('//input[@id="miamCertificationDocumentUpload"]', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  // Why is the applicant not attending a MIAM?
  async fillMIAMNotAttendingPage() {
    await I.waitForText(this.fields.whyNotAttending);
    await I.retry(retryCount).waitForElement('#mpuExemptionReasons-mpuDomesticAbuse');
    await I.retry(retryCount).checkOption('#mpuExemptionReasons-mpuDomesticAbuse');
    await I.retry(retryCount).waitForElement('#mpuExemptionReasons-mpuChildProtectionConcern');
    await I.retry(retryCount).checkOption('#mpuExemptionReasons-mpuChildProtectionConcern');
    await I.retry(retryCount).waitForElement('#mpuExemptionReasons-mpuUrgency');
    await I.retry(retryCount).checkOption('#mpuExemptionReasons-mpuUrgency');
    await I.retry(retryCount).waitForElement('#mpuExemptionReasons-mpuPreviousMiamAttendance');
    await I.retry(retryCount).checkOption('#mpuExemptionReasons-mpuPreviousMiamAttendance');
    await I.retry(retryCount).waitForElement('#mpuExemptionReasons-mpuOther');
    await I.retry(retryCount).checkOption('#mpuExemptionReasons-mpuOther');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  // What evidence of domestic abuse does the applicant have?

  async fillMIAMDomesticAbuse() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForText(this.fields.whatEvidence);
    await I.retry(retryCount).click(this.fields.checkList1);
    await I.retry(retryCount).click(this.fields.checkList2);
    await I.retry(retryCount).click(this.fields.checkList3);
    await I.retry(retryCount).click(this.fields.checkList4);
    await I.retry(retryCount).click(this.fields.checkList5);
    await I.retry(retryCount).click(this.fields.checkList6);
    await I.retry(retryCount).click(this.fields.checkList7);
    await I.retry(retryCount).click(this.fields.checkList8);
    await I.retry(retryCount).click(this.fields.checkList9);
    await I.retry(retryCount).click(this.fields.checkList10);
    await I.retry(retryCount).click(this.fields.checkList11);
    await I.retry(retryCount).click(this.fields.checkList12);
    await I.retry(retryCount).click(this.fields.checkList13);
    await I.retry(retryCount).click(this.fields.checkList14);
    await I.retry(retryCount).click(this.fields.checkList15);
    await I.retry(retryCount).click(this.fields.checkList16);
    await I.retry(retryCount).click(this.fields.checkList17);
    await I.retry(retryCount).click(this.fields.checkList18);
    await I.retry(retryCount).click(this.fields.checkList19);
    await I.retry(retryCount).click(this.fields.checkList20);
    await I.retry(retryCount).click(this.fields.checkList21);
    await I.retry(retryCount).click(this.fields.checkList22);
    await I.retry(retryCount).waitForText('*Can you provide evidence? (Optional)');
    await I.retry(retryCount).click('#mpuIsDomesticAbuseEvidenceProvided_Yes');
    await I.retry(retryCount).click(this.fields.addNew);
    await I.retry(retryCount).attachFile('//input[@id="mpuDomesticAbuseEvidenceDocument_0_domesticAbuseDocument"]', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMChildProtectionConcern() {
    await I.retry(retryCount).waitForText('*The applicant confirms that a child who would be the subject of the application or another child of');
    await I.retry(retryCount).click('#mpuChildProtectionConcernReason-mpuChildProtectionConcern_value_1');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMUrgency() {
    await I.retry(retryCount).waitForText('Why must the application be made urgently? (Optional)');
    await I.retry(retryCount).click('#mpuUrgencyReason-miamPolicyUpgradeUrgencyReason_Value_5');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMPreviousAttendanceOption1() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForText('Has, there been previous attendance of a MIAM or non-court dispute resolution? (Optional)');
    await I.retry(retryCount).click('#mpuPreviousMiamAttendanceReason-miamPolicyUpgradePreviousAttendance_Value_1');
    await I.retry(retryCount).waitForText('* Upload the MIAM certificate or evidence of participating in non-court dispute resolution (Optional');
    await I.retry(retryCount).attachFile('//input[@id="mpuDocFromDisputeResolutionProvider"]', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMPreviousAttendanceOption2() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForText('Has, there been previous attendance of a MIAM or non-court dispute resolution? (Optional)');
    await I.retry(retryCount).click('#mpuPreviousMiamAttendanceReason-miamPolicyUpgradePreviousAttendance_Value_2');
    await I.retry(retryCount).waitForText('*What evidence of MIAM attendance are you submitting? (Optional)');
    await I.retry(retryCount).click('#mpuTypeOfPreviousMiamAttendanceEvidence-miamCertificate');
    await I.retry(retryCount).attachFile('//input[@id="mpuCertificateByMediator"]', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillMIAMPreviousAttendanceOption3() {
    await I.retry(retryCount).waitForText('Has, there been previous attendance of a MIAM or non-court dispute resolution? (Optional)');
    await I.retry(retryCount).click('#mpuPreviousMiamAttendanceReason-miamPolicyUpgradePreviousAttendance_Value_2');
    await I.retry(retryCount).waitForText('*What evidence of MIAM attendance are you submitting? (Optional)');
    await I.retry(retryCount).click('#mpuTypeOfPreviousMiamAttendanceEvidence-miamAttendanceDetails');
    await I.retry(retryCount).fillField('#mpuMediatorDetails', this.fields.details);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },
  async fillMIAMOther() {
    await I.retry(retryCount).waitForText('What other grounds of exemption apply? (Optional)');
    await I.retry(retryCount).click('#mpuOtherExemptionReasons-miamPolicyUpgradeOtherGrounds_Value_2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async checkYourAnswers() {
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },


  async runMIAMEventHappyPath() {
    await this.triggerEvent();

    await this.fillMIAMEmergencyDifferentFlow();
    await this.fillMIAMCertificationPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.fillMIAMEmergencyProtectionPage();
    await this.fillMIAMNotAttendingPage();
    await this.fillMIAMDomesticAbuse();
    await this.fillMIAMChildProtectionConcern();
    await this.fillMIAMUrgency();
    await this.fillMIAMPreviousAttendanceOption1();
    await this.fillMIAMOther();
    await this.checkYourAnswers();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
