const I = actor();
const retryCount = 3;

module.exports = {
  fields: {
    headerText: 'Other proceedings',
    previousOrOngoingProceedingsForChildren: '#previousOrOngoingProceedingsForChildren-yes',
    existingProceedings_0_PreviousOrOngoingProceedings: '#existingProceedings_0_previousOrOngoingProceedings-previous',
    existingProceedings_0_CaseNumber: '#existingProceedings_0_caseNumber',
    dateStartedDay: '#dateStarted-day',
    dateStartedMonth: '#dateStarted-month',
    dateStartedYear: '#dateStarted-year',
    dateEndedDay: '#dateEnded-day',
    dateEndedMonth: '#dateEnded-month',
    dateEndedYear: '#dateEnded-year',
    typeOfOrderEmergencyProtectionOrder: '#existingProceedings_0_typeOfOrder-emergencyProtectionOrder',
    existingProceedings_0_NameOfJudge: '#existingProceedings_0_nameOfJudge',
    existingProceedings_0_NameOfCourt: '#existingProceedings_0_nameOfCourt',
    existingProceedings_0_NameOfChildrenInvolved: '#existingProceedings_0_nameOfChildrenInvolved',
    existingProceedings_0_NameOfGuardian: '#existingProceedings_0_nameOfGuardian',
    existingProceedings_0_NameAndOffice: '#existingProceedings_0_nameAndOffice',
    previousOrOngoingProceedingsFL401: '//input[@id="fl401OtherProceedingDetails_hasPrevOrOngoingOtherProceeding-yes"]',
    nameOfTheCourt: '#fl401OtherProceedingDetails_fl401OtherProceedings_0_nameOfCourt',
    caseNumber: '#fl401OtherProceedingDetails_fl401OtherProceedings_0_caseNumber',
    typeOfCase: '#fl401OtherProceedingDetails_fl401OtherProceedings_0_typeOfCase',
    anyOtherDetails: '#fl401OtherProceedingDetails_fl401OtherProceedings_0_anyOtherDetails'
  },

  async  otherProceedingsEventC100() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).click(this.fields.previousOrOngoingProceedingsForChildren);
    // await I.retry(retryCount).wait('2');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).see('Are these previous or ongoing proceedings? (Optional)');
    // I.wait('3');
    await I.retry(retryCount).click(this.fields.existingProceedings_0_PreviousOrOngoingProceedings);
    await I.retry(retryCount).fillField(this.fields.existingProceedings_0_CaseNumber, '123456789');
    await I.retry(retryCount).fillField(this.fields.dateStartedDay, '12');
    await I.retry(retryCount).fillField(this.fields.dateStartedMonth, '12');
    // await I.retry(retryCount).wait('2');
    await I.retry(retryCount).fillField(this.fields.dateStartedYear, '2021');
    await I.retry(retryCount).fillField(this.fields.dateEndedDay, '13');
    await I.retry(retryCount).fillField(this.fields.dateEndedMonth, '12');
    // await I.retry(retryCount).wait('2');
    await I.retry(retryCount).fillField(this.fields.dateEndedYear, '2021');
    await I.retry(retryCount).click(this.fields.typeOfOrderEmergencyProtectionOrder);
    await I.retry(retryCount).fillField(this.fields.existingProceedings_0_NameOfJudge, 'Sir James Holman');
    await I.retry(retryCount).fillField(this.fields.existingProceedings_0_NameOfCourt, 'Uxbridge');
    await I.retry(retryCount).fillField(this.fields.existingProceedings_0_NameOfChildrenInvolved, 'Olivia, Amelia');
    await I.retry(retryCount).fillField(this.fields.existingProceedings_0_NameOfGuardian, 'Mia');
    await I.retry(retryCount).fillField(this.fields.existingProceedings_0_NameAndOffice, 'Grace');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).waitForText('Save and continue', '30');
    await I.retry(retryCount).click('Save and continue');
  },

  async  otherProceedingsEventFL401() {
    await I.retry(retryCount).triggerEvent(this.fields.headerText);
    await I.retry(retryCount).waitForPage('h1', this.fields.headerText);
    await I.retry(retryCount).click(this.fields.previousOrOngoingProceedingsFL401);
    await I.retry(retryCount).wait('2');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).fillField(this.fields.nameOfTheCourt, 'Westminister');
    await I.retry(retryCount).fillField(this.fields.caseNumber, '123456');
    await I.retry(retryCount).fillField(this.fields.typeOfCase, 'Respondent');
    await I.retry(retryCount).fillField(this.fields.anyOtherDetails, 'Testing');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).waitForText('Save and continue', '30');
    await I.retry(retryCount).click('Save and continue');
  }

};
