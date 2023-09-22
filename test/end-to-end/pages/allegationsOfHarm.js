const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    textareaText: 'Testing text area',
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    allegationsOfHarmYesNo: '//*[@id="newAllegationsOfHarmYesNo_Yes"]',
    domesticAbuse: '//*[@id="newAllegationsOfHarmDomesticAbuseYesNo_Yes"]',
    physicalAbuseVictimApplicants: '//*[@id="childAbuses-physicalAbuse"]',
    emotionalAbuseVictimApplicants: '//*[@id="childAbuses-emotionalAbuse"]',
    psychologicalAbuseVictimApplicants: '//*[@id="childAbuses-psychologicalAbuse"]',
    sexualAbuseVictimApplicants: '//*[@id="childAbuses-sexualAbuse"]',
    financialAbuseVictimApplicants: '//*[@id="childAbuses-financialAbuse"]',
    childAbduction: '//*[@id="newAllegationsOfHarmChildAbductionYesNo_Yes"]',
    childAbductionReason: '//*[@id="newChildAbductionReasons"]',
    childAbuse: '//*[@id="newAllegationsOfHarmChildAbuseYesNo_Yes"]',
    drugsAndAlcohol: '//*[@id="newAllegationsOfHarmSubstanceAbuseYesNo_Yes"]',
    otherSafety: '//*[@id="newAllegationsOfHarmOtherConcerns_Yes"]',
    physicalAbuseAllChildrenAtRiskYes: '//*[@id="allChildrenAreRiskPhysicalAbuse_Yes"]',
    physicalAbuseAllChildrenDescription: '//*[@id="childPhysicalAbuse_abuseNatureDescription"]',
    physicalAbuseAllChildrenDuration: '//*[@id="childPhysicalAbuse_behavioursStartDateAndLength"]',
    physicalAbuseAllChildrenSeekHelp: '//*[@id="childPhysicalAbuse_behavioursApplicantSoughtHelp_Yes"]',
    physicalAbuseAllChildrenSeekDescription: '//*[@id="childPhysicalAbuse_behavioursApplicantHelpSoughtWho"]',


    // Orders Page
    ordersNonMolestationYes: '//*[@id="newOrdersNonMolestation_Yes"]',
    ordersOccupationNo: '//*[@id="newOrdersOccupation_No"]',
    ordersForcedMarriageProtection: '//*[@id="newOrdersForcedMarriageProtection_No"]',
    ordersRestraining: '//*[@id="newOrdersRestraining_No"]',
    ordersOtherInjunctive: '//*[@id="newOrdersOtherInjunctive_No"]',

    // Behaviours Page
    behaviours_0_abuseNatureDescription: '//*[@id="domesticBehaviours_0_newAbuseNatureDescription"]',
    behaviours_0_behavioursStartDateAndLength: '//*[@id="domesticBehaviours_0_newBehavioursStartDateAndLength"]',
    behaviours_0_behavioursNature: '//*[@id="domesticBehaviours_0_newBehavioursApplicantHelpSoughtWho"]',
    behaviours_0_behavioursApplicantSoughtHelp: '//*[@id="domesticBehaviours_0_newBehavioursApplicantSoughtHelp_Yes"]',

    // OtherConcerns Page
    allegationsOfHarmOtherConcerns: '//*[@id="allegationsOfHarmOtherConcerns_Yes"]',
    allegationsOfHarmOtherConcernsDetails: '//*[@id="newAllegationsOfHarmOtherConcernsCourtActions"]',
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
    await I.retry(retryCount).click(this.fields.childAbduction);
    await I.retry(retryCount).click(this.fields.childAbuse);
    await I.retry(retryCount).click(this.fields.drugsAndAlcohol);
    await I.retry(retryCount).fillField('//*[@id="newAllegationsOfHarmSubstanceAbuseDetails"]', this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.otherSafety);
    await I.retry(retryCount).fillField('//*[@id="newAllegationsOfHarmOtherConcernsDetails"]', this.fields.textareaText);

    // Orders
    const uploadTime = 5;
    await I.retry(retryCount).click(this.fields.ordersNonMolestationYes);
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-year"]', '1999');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-year"]', '2000');
    await I.retry(retryCount).checkOption('//*[@id="newOrdersNonMolestationCurrent_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationCourtName"]', 'Court Name');
    await I.retry(retryCount).attachFile('//*[@id="newOrdersNonMolestationDocument"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click(this.fields.ordersOccupationNo);
    await I.retry(retryCount).click(this.fields.ordersForcedMarriageProtection);
    await I.retry(retryCount).click(this.fields.ordersRestraining);
    await I.retry(retryCount).click(this.fields.ordersOtherInjunctive);
    await I.retry(retryCount).click('//*[@id="newOrdersUndertakingInPlace_No"]');
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
    await I.retry(retryCount).click('Continue');
  },

  async childAbuseBehaviours() {
    await I.retry(retryCount).waitForText('Child abuse - Behaviours');
    await I.retry(retryCount).click(this.fields.physicalAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.psychologicalAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.sexualAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.emotionalAbuseVictimApplicants);
    await I.retry(retryCount).click(this.fields.financialAbuseVictimApplicants);
    await I.retry(retryCount).click('Continue');
  },

  async childPhysicalAbuseBehaviours() {
    await I.retry(retryCount).waitForText('Child abuse - Physical abuse');
    await I.retry(retryCount).click(this.fields.physicalAbuseAllChildrenAtRiskYes);
    await I.retry(retryCount).fillField(this.fields.physicalAbuseAllChildrenDescription, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.physicalAbuseAllChildrenDuration, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.physicalAbuseAllChildrenSeekHelp);
    await I.retry(retryCount).click(this.fields.physicalAbuseAllChildrenSeekDescription);
    await I.retry(retryCount).click('Continue');
  },

  async childPhychologicalAbuse() {
    await I.retry(retryCount).waitForText('Child abuse - Psychological abuse');
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },

  async childSexualAbuse() {
    await I.retry(retryCount).waitForText('Child abuse - Sexual abuse');
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },

  async childEmotionalAbuse() {
    await I.retry(retryCount).waitForText('Child abuse - Sexual abuse');
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },

  async childFinancialAbuse() {
    await I.retry(retryCount).waitForText('Child abuse - Financial abuse');
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },

  async childAbduction() {
    await I.retry(retryCount).waitForText('Child abduction');
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.childAbductionReason, this.fields.textareaText);
    await I.retry(retryCount).checkOption('//*[@id="newPreviousAbductionThreats_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="newPreviousAbductionThreatsDetails"]', this.fields.textareaText);
    await I.retry(retryCount).fillField('//*[@id="newChildrenLocationNow"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//*[@id="newAbductionPassportOfficeNotified_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="newAbductionPreviousPoliceInvolvement_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="newAbductionPreviousPoliceInvolvementDetails"]', this.fields.textareaText);
    await I.retry(retryCount).checkOption('//*[@id="newAbductionChildHasPassport_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="childPassportDetails_newChildHasMultiplePassports_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="childPassportDetails_newChildPassportPossession-otherPerson"]');
    await I.retry(retryCount).fillField('//*[@id="childPassportDetails_newChildPassportPossessionOtherDetails"]', this.fields.textareaText);
    await I.retry(retryCount).click('Continue');
  },

  async otherConcerns() {
    await I.retry(retryCount).waitForText('Other concerns');
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.allegationsOfHarmOtherConcernsDetails, this.fields.textareaText);
    // eslint-disable-next-line max-len
    // Child Contact
    await I.retry(retryCount).checkOption('//*[@id="newAgreeChildUnsupervisedTime_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="newAgreeChildSupervisedTime_Yes"]');
    await I.retry(retryCount).checkOption('//*[@id="newAgreeChildOtherContact_Yes"]');
    await I.retry(retryCount).click('Continue');
  },

  async submitEvent() {
    I.wait('2');
    await I.retry(retryCount).waitForElement('h2');
    await I.retry(retryCount).see('Check your answers');
    I.wait('2');
    await I.retry(retryCount).click('Save and continue');
  },

  async allegationsOfHarmEvent() {
    await this.triggerEvent('Allegations of harm');
    await this.allegationsOfHarmForChild();
    await this.behaviour();
    await this.childAbuseBehaviours();
    await this.childPhysicalAbuseBehaviours();
    await this.childPhychologicalAbuse();
    await this.childSexualAbuse();
    await this.childEmotionalAbuse();
    await this.childFinancialAbuse();
    await this.childAbduction();
    await this.otherConcerns();
    await this.submitEvent();
  }
};