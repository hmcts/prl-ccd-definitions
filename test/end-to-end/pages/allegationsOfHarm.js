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
    await I.waitForElement(this.fields.eventList);
    await I.selectOption(this.fields.eventList, eventName);
    await I.click(this.fields.submit);
  },

  async allegationsOfHarmForChild() {
    await I.waitForText('Allegations of harm');
    I.wait('2');
    await I.click(this.fields.allegationsOfHarmYesNo);
    await I.click('Continue');
    I.wait('2');
    await I.click(this.fields.domesticAbuse);
    I.wait('2');
    await I.click(this.fields.physicalAbuseVictimApplicants);
    await I.click(this.fields.emotionalAbuseVictimApplicants);
    await I.click(this.fields.psychologicalAbuseVictimApplicants);
    await I.click(this.fields.sexualAbuseVictimApplicants);
    await I.click(this.fields.financialAbuseVictimApplicants);
    await I.click(this.fields.childAbduction);
    await I.fillField(this.fields.childAbductionReason, this.fields.textareaText);
    await I.checkOption('//*[@id="previousAbductionThreats_Yes"]');
    await I.fillField('//*[@id="previousAbductionThreatsDetails"]', this.fields.textareaText);
    await I.fillField('//*[@id="childrenLocationNow"]', this.fields.textareaText);
    await I.checkOption('//*[@id="abductionPassportOfficeNotified_Yes"]');
    await I.checkOption('//*[@id="abductionChildHasPassport_Yes"]');
    await I.checkOption('//*[@id="abductionChildPassportPosession-other"]');
    await I.fillField('//*[@id="abductionChildPassportPosessionOtherDetail"]', this.fields.textareaText);
    await I.checkOption('//*[@id="abductionPreviousPoliceInvolvement_Yes"]');
    await I.fillField('//*[@id="abductionPreviousPoliceInvolvementDetails"]', this.fields.textareaText);
    await I.click(this.fields.childAbuse);
    await I.click(this.fields.drugsAndAlcohol);
    await I.click(this.fields.otherSafety);

    // Orders
    const uploadTime = 5;
    await I.click(this.fields.ordersNonMolestationNo);
    await I.fillField('//*[@id="ordersNonMolestationDateIssued-day"]', '1');
    await I.fillField('//*[@id="ordersNonMolestationDateIssued-month"]', '1');
    await I.fillField('//*[@id="ordersNonMolestationDateIssued-year"]', '1999');
    await I.fillField('//*[@id="ordersNonMolestationEndDate-day"]', '1');
    await I.fillField('//*[@id="ordersNonMolestationEndDate-month"]', '1');
    await I.fillField('//*[@id="ordersNonMolestationEndDate-year"]', '2000');
    await I.checkOption('//*[@id="ordersNonMolestationCurrent_Yes"]');
    await I.fillField('//*[@id="ordersNonMolestationCourtName"]', 'Court Name');
    await I.attachFile('//*[@id="ordersNonMolestationDocument"]', '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.click(this.fields.ordersOccupationNo);
    await I.click(this.fields.ordersForcedMarriageProtection);
    await I.click(this.fields.ordersRestraining);
    await I.click(this.fields.ordersOtherInjunctive);
    await I.click('//*[@id="ordersUndertakingInPlace_No"]');
    await I.click('Continue');
  },

  async behaviour() {
    await I.waitForText('Behaviour');
    await I.click('Add new');
    I.wait('2');
    await I.fillField(this.fields.behaviours_0_abuseNatureDescription, this.fields.textareaText);
    await I.fillField(this.fields.behaviours_0_behavioursStartDateAndLength, this.fields.textareaText);
    await I.click(this.fields.behaviours_0_behavioursApplicantSoughtHelp);
    await I.fillField(this.fields.behaviours_0_behavioursNature, this.fields.textareaText);
    await I.fillField('//*[@id="behaviours_0_behavioursApplicantHelpSoughtWho"]', this.fields.textareaText);
    await I.fillField('//*[@id="behaviours_0_behavioursApplicantHelpAction"]', this.fields.textareaText);
    await I.click('Continue');
  },
  async otherConcerns() {
    await I.waitForText('Other concerns');
    await I.click(this.fields.allegationsOfHarmOtherConcerns);
    I.wait('2');
    await I.fillField(this.fields.allegationsOfHarmOtherConcernsDetails, this.fields.textareaText);
    await I.fillField(this.fields.allegationsOfHarmOtherConcernsCourtActions, this.fields.textareaText);

    //Child Contact
    await I.checkOption('//*[@id="agreeChildUnsupervisedTime_Yes"]');
    await I.checkOption('//*[@id="agreeChildSupervisedTime_Yes"]');
    await I.checkOption('//*[@id="agreeChildOtherContact_Yes"]');
    await I.click('Continue');
  },

  async submitEvent() {
    I.wait('2');
    await I.waitForElement('h2');
    await I.see('Check your answers');
    await I.click('Save and continue');
  },

  async allegationsOfHarmEvent() {
    await this.triggerEvent('Allegations of harm');
    await this.allegationsOfHarmForChild();
    await this.behaviour();
    await this.otherConcerns();
    await this.submitEvent();
  }
};