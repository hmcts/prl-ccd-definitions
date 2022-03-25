const I = actor();

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
    allegationsOfHarmOtherConcerns: '//*[@id="allegationsOfHarmOtherConcerns_Yes"]',
    allegationsOfHarmOtherConcernsDetails: '//*[@id="allegationsOfHarmOtherConcernsDetails"]',
    allegationsOfHarmOtherConcernsCourtActions: '//*[@id="allegationsOfHarmOtherConcernsCourtActions"]'
  },

  async triggerEvent(eventName) {
     await I.retry(3).waitForElement(this.fields.eventList);
     await I.retry(3).selectOption(this.fields.eventList, eventName);
     await I.retry(3).click(this.fields.submit);
  },

  async allegationsOfHarmForChild() {
     await I.retry(3).waitForText('Allegations of harm');
    I.wait('2');
     await I.retry(3).click(this.fields.allegationsOfHarmYesNo);
     await I.retry(3).click('Continue');
    I.wait('2');
     await I.retry(3).click(this.fields.domesticAbuse);
    I.wait('2');
     await I.retry(3).click(this.fields.physicalAbuseVictimApplicants);
     await I.retry(3).click(this.fields.emotionalAbuseVictimApplicants);
     await I.retry(3).click(this.fields.psychologicalAbuseVictimApplicants);
     await I.retry(3).click(this.fields.sexualAbuseVictimApplicants);
     await I.retry(3).click(this.fields.financialAbuseVictimApplicants);
     await I.retry(3).click(this.fields.childAbduction);
     await I.retry(3).fillField(this.fields.childAbductionReason, this.fields.textareaText);
     await I.retry(3).checkOption('//*[@id="previousAbductionThreats_Yes"]');
     await I.retry(3).fillField('//*[@id="previousAbductionThreatsDetails"]', this.fields.textareaText);
     await I.retry(3).fillField('//*[@id="childrenLocationNow"]', this.fields.textareaText);
     await I.retry(3).checkOption('//*[@id="abductionPassportOfficeNotified_Yes"]');
     await I.retry(3).checkOption('//*[@id="abductionChildHasPassport_Yes"]');
     await I.retry(3).checkOption('//*[@id="abductionChildPassportPosession-other"]');
     await I.retry(3).fillField('//*[@id="abductionChildPassportPosessionOtherDetail"]', this.fields.textareaText);
     await I.retry(3).checkOption('//*[@id="abductionPreviousPoliceInvolvement_Yes"]');
     await I.retry(3).fillField('//*[@id="abductionPreviousPoliceInvolvementDetails"]', this.fields.textareaText);
     await I.retry(3).click(this.fields.childAbuse);
     await I.retry(3).click(this.fields.drugsAndAlcohol);
     await I.retry(3).click(this.fields.otherSafety);

    // Orders
    const uploadTime = 5;
     await I.retry(3).click(this.fields.ordersNonMolestationNo);
     await I.retry(3).fillField('//*[@id="ordersNonMolestationDateIssued-day"]', '1');
     await I.retry(3).fillField('//*[@id="ordersNonMolestationDateIssued-month"]', '1');
     await I.retry(3).fillField('//*[@id="ordersNonMolestationDateIssued-year"]', '1999');
     await I.retry(3).fillField('//*[@id="ordersNonMolestationEndDate-day"]', '1');
     await I.retry(3).fillField('//*[@id="ordersNonMolestationEndDate-month"]', '1');
     await I.retry(3).fillField('//*[@id="ordersNonMolestationEndDate-year"]', '2000');
     await I.retry(3).checkOption('//*[@id="ordersNonMolestationCurrent_Yes"]');
     await I.retry(3).fillField('//*[@id="ordersNonMolestationCourtName"]', 'Court Name');
     await I.retry(3).attachFile('//*[@id="ordersNonMolestationDocument"]', '../resource/dummy.pdf');
     await I.retry(3).wait(uploadTime);
     await I.retry(3).click(this.fields.ordersOccupationNo);
     await I.retry(3).click(this.fields.ordersForcedMarriageProtection);
     await I.retry(3).click(this.fields.ordersRestraining);
     await I.retry(3).click(this.fields.ordersOtherInjunctive);
     await I.retry(3).click('//*[@id="ordersUndertakingInPlace_No"]');
     await I.retry(3).click('Continue');
  },

  async behaviour() {
     await I.retry(3).waitForText('Behaviour');
     await I.retry(3).click('Add new');
    I.wait('2');
     await I.retry(3).fillField(this.fields.behaviours_0_abuseNatureDescription, this.fields.textareaText);
     await I.retry(3).fillField(this.fields.behaviours_0_behavioursStartDateAndLength, this.fields.textareaText);
     await I.retry(3).click(this.fields.behaviours_0_behavioursApplicantSoughtHelp);
     await I.retry(3).fillField(this.fields.behaviours_0_behavioursNature, this.fields.textareaText);
     await I.retry(3).fillField('//*[@id="behaviours_0_behavioursApplicantHelpSoughtWho"]', this.fields.textareaText);
     await I.retry(3).fillField('//*[@id="behaviours_0_behavioursApplicantHelpAction"]', this.fields.textareaText);
     await I.retry(3).click('Continue');
  },
  async otherConcerns() {
     await I.retry(3).waitForText('Other concerns');
     await I.retry(3).click(this.fields.allegationsOfHarmOtherConcerns);
    I.wait('2');
     await I.retry(3).fillField(this.fields.allegationsOfHarmOtherConcernsDetails, this.fields.textareaText);
     await I.retry(3).fillField(this.fields.allegationsOfHarmOtherConcernsCourtActions, this.fields.textareaText);

    // Child Contact
     await I.retry(3).checkOption('//*[@id="agreeChildUnsupervisedTime_Yes"]');
     await I.retry(3).checkOption('//*[@id="agreeChildSupervisedTime_Yes"]');
     await I.retry(3).checkOption('//*[@id="agreeChildOtherContact_Yes"]');
     await I.retry(3).click('Continue');
  },

  async submitEvent() {
    I.wait('2');
     await I.retry(3).waitForElement('h2');
     await I.retry(3).see('Check your answers');
     await I.retry(3).click('Save and continue');
  },

  async allegationsOfHarmEvent() {
    await this.triggerEvent('Allegations of harm');
    await this.allegationsOfHarmForChild();
    await this.behaviour();
    await this.otherConcerns();
    await this.submitEvent();
  }
};