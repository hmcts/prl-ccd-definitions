const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    textareaText: 'Testing text area',
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    allegationsOfHarmYesNo: '//*[@id="allegationsOfHarmYesNo_Yes"]',
    domesticAbuse: '//*[@id="allegationsOfHarmDomesticAbuseYesNo_Yes"]',
    physicalAbuseVictimApplicants: '//*[@id="physicalAbuseVictim-applicants"]',
    emotionalAbuseVictimApplicants: '//*[@id="emotionalAbuseVictim-applicants"]',
    psychologicalAbuseVictimApplicants: '//*[@id="psychologicalAbuseVictim-applicants"]',
    sexualAbuseVictimApplicants: '//*[@id="sexualAbuseVictim-applicants"]',
    financialAbuseVictimApplicants: '//*[@id="financialAbuseVictim-applicants"]',
    childAbduction: '//*[@id="allegationsOfHarmChildAbductionYesNo_Yes"]',
    childAbductionReason: '//*[@id="childAbductionReasons"]',
    childAbuse: '//*[@id="allegationsOfHarmChildAbuseYesNo_Yes"]',
    drugsAndAlcohol: '//*[@id="allegationsOfHarmSubstanceAbuseYesNo_Yes"]',
    otherSafety: '//*[@id="allegationsOfHarmOtherConcernsYesNo_Yes"]',

    // Orders Page
    ordersNonMolestationNo: '//*[@id="ordersNonMolestation_Yes"]',
    ordersOccupationNo: '//*[@id="ordersOccupation_No"]',
    ordersForcedMarriageProtection: '//*[@id="ordersForcedMarriageProtection_No"]',
    ordersRestraining: '//*[@id="ordersRestraining_No"]',
    ordersOtherInjunctive: '//*[@id="ordersOtherInjunctive_No"]',

    // Behaviours Page
    behaviours_0_abuseNatureDescription: '//*[@id="behaviours_0_abuseNatureDescription"]',
    behaviours_0_behavioursStartDateAndLength: '//*[@id="behaviours_0_behavioursStartDateAndLength"]',
    behaviours_0_behavioursNature: '//*[@id="behaviours_0_behavioursNature"]',
    behaviours_0_behavioursApplicantSoughtHelp: '//*[@id="behaviours_0_behavioursApplicantSoughtHelp_Yes"]',

    // OtherConcerns Page
   // allegationsOfHarmOtherConcerns: '//*[@id="allegationsOfHarmOtherConcerns_Yes"]',
    //allegationsOfHarmOtherConcernsDetails: '//*[@id="allegationsOfHarmOtherConcernsDetails"]',
    allegationsOfHarmOtherConcernsCourtActions: '//*[@id="allegationsOfHarmOtherConcernsCourtActions"]'
  },

  async triggerEvent(eventName) {
    await I.retry(retryCount).waitForElement(this.fields.eventList);
    await I.retry(retryCount).selectOption(this.fields.eventList, eventName);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async allegationsOfHarmForChild() {
    await I.retry(retryCount).waitForText('Allegations of harm');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.allegationsOfHarmYesNo);
    await I.retry(retryCount).click('Continue');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.domesticAbuse);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.physicalAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.emotionalAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.psychologicalAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.sexualAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.financialAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.childAbduction);
    await I.retry(retryCount).fillField(this.fields.childAbductionReason, this.fields.textareaText);
    await I.retry(retryCount).checkOption('//*[@id="previousAbductionThreats_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="previousAbductionThreatsDetails"]', this.fields.textareaText);
    await I.retry(retryCount).fillField('//*[@id="childrenLocationNow"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//*[@id="abductionPassportOfficeNotified_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="abductionChildHasPassport_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="abductionChildPassportPosession-other"]');
    await I.retry(retryCount).fillField('//*[@id="abductionChildPassportPosessionOtherDetail"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//*[@id="abductionPreviousPoliceInvolvement_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="abductionPreviousPoliceInvolvementDetails"]', this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.childAbuse);
    await I.retry(retryCount).click(this.fields.drugsAndAlcohol);
    await I.retry(retryCount).click(this.fields.otherSafety);

    // Orders
    const uploadTime = 5;
    await I.retry(retryCount).click(this.fields.ordersNonMolestationNo);
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationDateIssued-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationDateIssued-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationDateIssued-year"]', '1999');
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationEndDate-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationEndDate-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationEndDate-year"]', '2000');
    await I.retry(retryCount).checkOption('//*[@id="ordersNonMolestationCurrent_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="ordersNonMolestationCourtName"]', 'Court Name');
    await I.retry(retryCount).attachFile('//*[@id="ordersNonMolestationDocument"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click(this.fields.ordersOccupationNo);
    await I.retry(retryCount).click(this.fields.ordersForcedMarriageProtection);
    await I.retry(retryCount).click(this.fields.ordersRestraining);
    await I.retry(retryCount).click(this.fields.ordersOtherInjunctive);
    await I.retry(retryCount).click('//*[@id="ordersUndertakingInPlace_No"]');
    await I.retry(retryCount).click('Continue');
  },

  async behaviour() {
    await I.retry(retryCount).waitForText('Behaviour');
    await I.retry(retryCount).click('Add new');
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.behaviours_0_abuseNatureDescription, this.fields.textareaText);
    // eslint-disable-next-line max-len
    await I.retry(retryCount).fillField(this.fields.behaviours_0_behavioursStartDateAndLength, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.behaviours_0_behavioursApplicantSoughtHelp);
    await I.retry(retryCount).fillField(this.fields.behaviours_0_behavioursNature, this.fields.textareaText);
    await I.retry(retryCount).fillField('//*[@id="behaviours_0_behavioursApplicantHelpSoughtWho"]', this.fields.textareaText);
    await I.retry(retryCount).fillField('//*[@id="behaviours_0_behavioursApplicantHelpAction"]', this.fields.textareaText);
    await I.retry(retryCount).click('Continue');
  },
  async otherConcerns() {
    await I.retry(retryCount).waitForText('Other concerns');
    //await I.retry(retryCount).click(this.fields.allegationsOfHarmOtherConcerns);
    I.wait('2');
    //await I.retry(retryCount).fillField(this.fields.allegationsOfHarmOtherConcernsDetails, this.fields.textareaText);
    // eslint-disable-next-line max-len
    await I.retry(retryCount).fillField(this.fields.allegationsOfHarmOtherConcernsCourtActions, this.fields.textareaText);

    // Child Contact
    await I.retry(retryCount).checkOption('//*[@id="agreeChildUnsupervisedTime_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="agreeChildSupervisedTime_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="agreeChildOtherContact_Yes"]');
    await I.retry(retryCount).click('Continue');
  },

  async submitEvent() {
    I.wait('2');
    await I.retry(retryCount).waitForElement('h2');
    await I.retry(retryCount).see('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },

  async allegationsOfHarmEvent() {
    await this.triggerEvent('Allegations of harm');
    await this.allegationsOfHarmForChild();
    await this.behaviour();
    await this.otherConcerns();
    await this.submitEvent();
  }
};