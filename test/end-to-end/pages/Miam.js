const I = actor();

module.exports = {

  fields: { submit: 'button[type="submit"]' },

  async triggerEvent() {
    await I.triggerEvent('MIAM');
  },

  async fillHasAttendedMIAMPage() {
    await I.waitForElement('#applicantAttendedMiam_No');
    await I.checkOption('#applicantAttendedMiam_No');
    await I.waitForElement('#claimingExemptionMiam_Yes');
    await I.checkOption('#claimingExemptionMiam_Yes');
    await I.waitForElement('#familyMediatorMiam_Yes');
    await I.checkOption('#familyMediatorMiam_Yes');
    await I.click(this.fields.submit);
  },

  async fillMIAMCertificationPage() {
    const uploadTime = 5;
    await I.waitForElement('//input[@id="mediatorRegistrationNumber1"]');
    await I.fillField('//input[@id="mediatorRegistrationNumber1"]', 'URN12345');
    await I.fillField('//input[@id="familyMediatorServiceName1"]', 'Test service name');
    await I.fillField('//input[@id="soleTraderName1"]', 'Test sole trader');
    await I.attachFile('//input[@id="miamCertificationDocumentUpload1"]', '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.click(this.fields.submit);
  },

  async fillHasAttendedMIAMPageDifferentFlow() {
    await I.waitForElement('#applicantAttendedMiam_No');
    await I.checkOption('#applicantAttendedMiam_No');
    await I.waitForElement('#claimingExemptionMiam_Yes');
    await I.checkOption('#claimingExemptionMiam_Yes');
    await I.waitForElement('#familyMediatorMiam_No');
    await I.checkOption('#familyMediatorMiam_No');
    await I.click(this.fields.submit);
  },

  async fillMIAMExemptions() {
    await I.waitForText('MIAM Exemptions : what is the reason(s) for the applicant not attending a MIAM?');
    await I.click('#miamExemptionsChecklist-domesticViolence');
    await I.click('#miamExemptionsChecklist-childProtectionConcern');
    await I.click('#miamExemptionsChecklist-urgency');
    await I.click('#miamExemptionsChecklist-previousMIAMattendance');
    await I.click('#miamExemptionsChecklist-other');
    await I.click(this.fields.submit);
  },

  async fillMIAMEvidenceDomesticViolence() {
    await I.waitForText('MIAM Evidence : What evidence of domestic violence or abuse does the applicant have ?');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_22');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_21');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_20');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_19');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_18');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_17');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_16');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_15');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_13');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_12');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_11');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_10');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_9');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_8');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_7');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_6');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_5');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_4');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_3');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_2');
    await I.click('#miamDomesticViolenceChecklist-miamDomesticViolenceChecklistEnum_Value_1');
    await I.click(this.fields.submit);
  },

  async fillMIAMEvidenceUrgency() {
    await I.waitForText('MIAM Evidence: what reason does the applicant have for the application to be made urgently?');
    await I.click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_5');
    await I.click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_4');
    await I.click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_3');
    await I.click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_2');
    await I.click('#miamUrgencyReasonChecklist-miamUrgencyReasonChecklistEnum_Value_1');
    await I.click(this.fields.submit);
  },

  async fillMIAMEvidencePreviousMiamAttendance() {
    await I.waitForText('MIAM Evidence : Previous MIAM attendance or MIAM exemption');
    await I.click('#miamPreviousAttendanceChecklist-miamPreviousAttendanceChecklistEnum_Value_3');
    await I.click(this.fields.submit);
  },

  async fillMIAMEvidenceWhatGroundsOfExemption() {
    await I.waitForText('MIAM Evidence : What other grounds of exemption apply?');
    await I.click('#miamOtherGroundsChecklist-miamOtherGroundsChecklistEnum_Value_6');
    await I.click(this.fields.submit);
  },

  async fillMIAMEvidenceChildProtectionConcerns() {
    await I.waitForText('MIAM Evidence: What reason does the applicant have for child protection concerns?');
    await I.click('#miamChildProtectionConcernList-MIAMChildProtectionConcernChecklistEnum_value_1');
    await I.click('#miamChildProtectionConcernList-MIAMChildProtectionConcernChecklistEnum_value_2');
    await I.click(this.fields.submit);
  },

  async runMIAMEventHappyPath() {
    await this.triggerEvent();
    await this.fillHasAttendedMIAMPage();
    await this.fillMIAMCertificationPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.fillHasAttendedMIAMPageDifferentFlow();
    await this.fillMIAMExemptions();
    await this.fillMIAMEvidenceDomesticViolence();
    await this.fillMIAMEvidenceUrgency();
    await this.fillMIAMEvidencePreviousMiamAttendance();
    await this.fillMIAMEvidenceWhatGroundsOfExemption();
    await this.fillMIAMEvidenceChildProtectionConcerns();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
