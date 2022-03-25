const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.retry(3).triggerEvent('MIAM');
  },

  async fillHasAttendedMIAMPage() {
    await I.retry(3).waitForElement('#applicantAttendedMiam_No');
    await I.retry(3).checkOption('#applicantAttendedMiam_No');
    await I.retry(3).waitForElement('#claimingExemptionMiam_Yes');
    await I.retry(3).checkOption('#claimingExemptionMiam_Yes');
    await I.retry(3).waitForElement('#familyMediatorMiam_Yes');
    await I.retry(3).checkOption('#familyMediatorMiam_Yes');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMCertificationPage() {
    const uploadTime = 5;
    await I.retry(3).waitForElement('//input[@id="mediatorRegistrationNumber1"]');
    await I.retry(3).fillField('//input[@id="mediatorRegistrationNumber1"]', 'URN12345');
    await I.retry(3).fillField('//input[@id="familyMediatorServiceName1"]', 'Test service name');
    await I.retry(3).fillField('//input[@id="soleTraderName1"]', 'Test sole trader');
    await I.retry(3).attachFile('//input[@id="miamCertificationDocumentUpload1"]', '../resource/dummy.pdf');
    await I.retry(3).wait(uploadTime);
    await I.retry(3).click(this.fields.submit);
  },

  async fillHasAttendedMIAMPageDifferentFlow() {
    await I.retry(3).waitForElement('#applicantAttendedMiam_No');
    await I.retry(3).checkOption('#applicantAttendedMiam_No');
    await I.retry(3).waitForElement('#claimingExemptionMiam_Yes');
    await I.retry(3).checkOption('#claimingExemptionMiam_Yes');
    await I.retry(3).waitForElement('#familyMediatorMiam_No');
    await I.retry(3).checkOption('#familyMediatorMiam_No');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMExemptions() {
    await I.retry(3).waitForText('MIAM Exemptions : what is the reason(s) for the applicant not attending a MIAM?');
    await I.retry(3).click('#miamExemptionsChecklist-domesticViolence');
    await I.retry(3).click('#miamExemptionsChecklist-childProtectionConcern');
    await I.retry(3).click('#miamExemptionsChecklist-urgency');
    await I.retry(3).click('#miamExemptionsChecklist-previousMIAMattendance');
    await I.retry(3).click('#miamExemptionsChecklist-other');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMEvidenceDomesticViolence() {
    await I.retry(3).waitForText('MIAM Evidence : What evidence of domestic violence or abuse does the applicant have ?');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_22');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_21');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_20');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_19');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_18');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_17');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_16');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_15');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_13');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_12');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_11');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_10');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_9');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_8');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_7');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_6');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_5');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_4');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_3');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_2');
    await I.retry(3).click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_1');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMEvidenceUrgency() {
    await I.retry(3).waitForText('MIAM Evidence: what reason does the applicant have for the application to be made urgently?');
    await I.retry(3).click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_5');
    await I.retry(3).click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_4');
    await I.retry(3).click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_3');
    await I.retry(3).click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_2');
    await I.retry(3).click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_1');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMEvidencePreviousMiamAttendance() {
    await I.retry(3).waitForText('MIAM Evidence : Previous MIAM attendance or MIAM exemption');
    await I.retry(3).click('#miamPreviousAttendanceChecklist-miamPreviousAttendanceChecklistEnum_Value_3');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMEvidenceWhatGroundsOfExemption() {
    await I.retry(3).waitForText('MIAM Evidence : What other grounds of exemption apply?');
    await I.retry(3).click('#miamOtherGroundsChecklist-miamOtherGroundsChecklistEnum_Value_6');
    await I.retry(3).click(this.fields.submit);
  },

  async fillMIAMEvidenceChildProtectionConcerns() {
    await I.retry(3).waitForText('MIAM Evidence: What reason does the applicant have for child protection concerns?');
    await I.retry(3).click('#miamChildProtectionConcernList-MIAMChildProtectionConcernChecklistEnum_value_1');
    await I.retry(3).click('#miamChildProtectionConcernList-MIAMChildProtectionConcernChecklistEnum_value_2');
    await I.retry(3).click(this.fields.submit);
  },

  async runMIAMEventHappyPath() {
    await this.triggerEvent();
    await this.fillHasAttendedMIAMPage();
    await this.fillMIAMCertificationPage();
    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.fillHasAttendedMIAMPageDifferentFlow();
    await this.fillMIAMExemptions();
    await this.fillMIAMEvidenceDomesticViolence();
    await this.fillMIAMEvidenceUrgency();
    await this.fillMIAMEvidencePreviousMiamAttendance();
    await this.fillMIAMEvidenceWhatGroundsOfExemption();
    await this.fillMIAMEvidenceChildProtectionConcerns();
    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};
