const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    textareaText: 'Testing text area',
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    newAllegationsOfHarmLabel: '//*[@id="newAllegationsOfHarmLabel"]',
    domesticAbuse: '//*[@id="newAllegationsOfHarmDomesticAbuseYesNo_Yes"]',
    childAbuse: '//*[@id="newAllegationsOfHarmChildAbuseYesNo_Yes"]',
    childAbduction: '//*[@id="newAllegationsOfHarmChildAbductionYesNo_Yes"]',
    substanceAbuse: '//*[@id="newAllegationsOfHarmSubstanceAbuseYesNo_Yes"]',
    substanceAbuseReason: '//*[@id="newAllegationsOfHarmSubstanceAbuseDetails"]',
    otherSafetyConcerns: '//*[@id="newAllegationsOfHarmOtherConcerns_Yes"]',
    otherSafetyConcernsReason: '//*[@id="newAllegationsOfHarmOtherConcernsDetails"]',

    // Orders Page
    ordersNonMolestationYes: '//*[@id="newOrdersNonMolestation_Yes"]',
    ordersOccupationNo: '//*[@id="newOrdersOccupation_No"]',
    ordersForcedMarriageProtectionNo: '//*[@id="newOrdersForcedMarriageProtection_No"]',
    ordersRestrainingNo: '//*[@id="newOrdersRestraining_No"]',
    ordersOtherInjunctiveNo: '//*[@id="newOrdersOtherInjunctive_No"]',
    ordersUndertakingNo: '//*[@id="newOrdersUndertakingInPlace_No"]',

    // Domestic Abuse - Behaviours
    behaviourDAPhysicalAbuse: '//*[@id="domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_1"]',
    behaviourDANatureWhatWhoDescription: '//*[@id="domesticBehaviours_0_newAbuseNatureDescription"]',
    behaviourDAStartDateAndLength: '//*[@id="domesticBehaviours_0_newBehavioursStartDateAndLength"]',
    behaviourDAApplicantSoughtHelp: '//*[@id="domesticBehaviours_0_newBehavioursApplicantSoughtHelp_Yes"]',
    behaviourDAWhoHelpFromDescription: '//*[@id="domesticBehaviours_0_newBehavioursApplicantHelpSoughtWho"]',

    // Child Abuse - Behaviours
    caTypeOfAbuse: '//*[@id="childAbuses-physicalAbuse"]',
    behaviourCARisk: '//*[@id="allChildrenAreRiskPhysicalAbuse_Yes"]',
    behaviourCANatureWhatWhoDescription: '//*[@id="childPhysicalAbuse_abuseNatureDescription"]',
    behaviourCAStartDateAndLength: '//*[@id="childPhysicalAbuse_behavioursStartDateAndLength"]',
    behaviourCAApplicantSoughtHelp: '//*[@id="childPhysicalAbuse_behavioursApplicantSoughtHelp_Yes"]',
    behaviourCAWhoHelpFromDescription: '//*[@id="childPhysicalAbuse_behavioursApplicantHelpSoughtWho"]',

    // Child Abduction Page
    abductionWhyDescription: '//*[@id="newChildAbductionReasons"]',
    abductionPreviousThreats: '//*[@id="newPreviousAbductionThreats_Yes"]',
    abductionPreviousThreatsDetails: '//*[@id="newPreviousAbductionThreatsDetails"]',
    abductionChildrenNowDescription: '//*[@id="newChildrenLocationNow"]',
    abductionPassportNotified: '//*[@id="newAbductionPassportOfficeNotified_Yes"]',
    abductionPoliceInvolced: '//*[@id="newAbductionPreviousPoliceInvolvement_Yes"]',
    abductionPoliceInvolvedDetails: '//*[@id="newAbductionPreviousPoliceInvolvementDetails"]',
    abductionChildrenHavePassport: '//*[@id="newAbductionChildHasPassport_Yes"]',
    abductionChildrenMorethanOnePassport: '//*[@id="childPassportDetails_newChildHasMultiplePassports_Yes"]',
    abductionChildPassportPossessionFather: '//*[@id="childPassportDetails_newChildPassportPossession-father"]',
    abductionChildPassportOtherPossession: '//*[@id="childPassportDetails_newChildPassportPossessionOtherDetails"]',

    // OtherConcerns Page
    otherConcernsWhatSteps: '//*[@id="newAllegationsOfHarmOtherConcernsCourtActions"]',
    otherConcernsUnsupervisedTime: '//*[@id="newAgreeChildUnsupervisedTime_Yes"]',
    otherConcernsSupervisedTime: '//*[@id="newAgreeChildSupervisedTime_Yes"]',
    otherConcernsOtherFormsOfContact: '//*[@id="newAgreeChildOtherContact_Yes"]'


  },
  async triggerEvent(eventName) {
    await I.triggerEvent(eventName);
    // await I.retry(retryCount).waitForElement(this.fields.eventList);
    // await I.retry(retryCount).selectOption(this.fields.eventList, eventName);
    // await I.wait('4');
    // await I.retry(retryCount).click(this.fields.submit);
    // await I.wait('7');
  },
  async allegationsOfHarm() {
    await I.retry(retryCount).waitForText('Allegations of harm');
    // await I.wait('4');
    await I.retry(retryCount).click('//*[@id="newAllegationsOfHarmYesNo_Yes"]');
    // await I.wait('4');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('4');
  },
  async allegationsOfHarmInformation() {
    await I.retry(retryCount).click(this.fields.domesticAbuse);
    await I.retry(retryCount).click(this.fields.childAbuse);
    await I.retry(retryCount).click(this.fields.childAbduction);
    await I.retry(retryCount).click(this.fields.substanceAbuse);
    await I.retry(retryCount).fillField(this.fields.substanceAbuseReason, this.fields.textareaText);
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.otherSafetyConcerns);
    await I.retry(retryCount).fillField(this.fields.otherSafetyConcernsReason, this.fields.textareaText);
    await I.wait('2');

    // Orders
    const uploadTime = 5;
    await I.retry(retryCount).click(this.fields.ordersNonMolestationYes);
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-year"]', '2020');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-year"]', '2022');
    await I.wait('1');
    await I.retry(retryCount).checkOption('//*[@id="newOrdersNonMolestationCurrent_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationCourtName"]', 'Court Name');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationCaseNumber"]', '1669-9873-4742-9548');
    await I.retry(retryCount).attachFile('//*[@id="newOrdersNonMolestationDocument"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click(this.fields.ordersOccupationNo);
    await I.retry(retryCount).click(this.fields.ordersForcedMarriageProtectionNo);
    await I.retry(retryCount).click(this.fields.ordersRestrainingNo);
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.ordersOtherInjunctiveNo);
    await I.retry(retryCount).click(this.fields.ordersUndertakingNo);
    await I.wait('2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async domesticAbuseBehaviour() {
    await I.retry(retryCount).waitForText('Domestic abuse - Behaviours');
    await I.wait('2');
    await I.retry(retryCount).click('Add new');
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.behaviourDAPhysicalAbuse);
    await I.retry(retryCount).fillField(this.fields.behaviourDANatureWhatWhoDescription, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.behaviourDAStartDateAndLength, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.behaviourDAApplicantSoughtHelp);
    await I.retry(retryCount).fillField('//*[@id="domesticBehaviours_0_newBehavioursApplicantHelpSoughtWho"]', this.fields.textareaText);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async childAbuseBehaviour() {
    await I.retry(retryCount).waitForText('Child abuse - Behaviours');
    await I.retry(retryCount).click(this.fields.caTypeOfAbuse);
    await I.retry(retryCount).continueEvent();
  },
  async childAbusePhysicalAbuse() {
    await I.retry(retryCount).click(this.fields.behaviourCARisk);
    await I.retry(retryCount).fillField(this.fields.behaviourCANatureWhatWhoDescription, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.behaviourCAStartDateAndLength, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.behaviourCAApplicantSoughtHelp);
    await I.retry(retryCount).fillField(this.fields.behaviourCAWhoHelpFromDescription, this.fields.textareaText);
    await I.wait('2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async childAbductionAOH() {
    await I.retry(retryCount).waitForText('Child abduction');
    await I.retry(retryCount).fillField(this.fields.abductionWhyDescription, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.abductionPreviousThreats);
    await I.wait('2');
    await I.retry(retryCount).fillField(this.fields.abductionPreviousThreatsDetails, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.abductionChildrenNowDescription, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.abductionPassportNotified);
    await I.retry(retryCount).click(this.fields.abductionPoliceInvolced);
    await I.retry(retryCount).fillField(this.fields.abductionPoliceInvolvedDetails, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.abductionChildrenHavePassport);
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.abductionChildrenMorethanOnePassport);
    await I.retry(retryCount).click(this.fields.abductionChildPassportPossessionFather);
    await I.wait('2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async otherConcerns() {
    await I.retry(retryCount).waitForText('Other concerns');
    await I.retry(retryCount).fillField(this.fields.otherConcernsWhatSteps, this.fields.textareaText);
    await I.wait('2');
    await I.retry(retryCount).waitForText('Child contact');
    await I.retry(retryCount).click(this.fields.otherConcernsUnsupervisedTime);
    await I.retry(retryCount).click(this.fields.otherConcernsSupervisedTime);
    await I.retry(retryCount).click(this.fields.otherConcernsOtherFormsOfContact);
    await I.wait('2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async submitEvent() {
    await I.wait('2');
    await I.retry(retryCount).waitForElement('h2');
    await I.retry(retryCount).see('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },
  async allegationsOfHarmEvent() {
    await this.triggerEvent('Allegations of harm');
    await this.allegationsOfHarm();
    await this.allegationsOfHarmInformation();
    await this.domesticAbuseBehaviour();
    await this.childAbuseBehaviour();
    await this.childAbusePhysicalAbuse();
    await this.childAbductionAOH();
    await this.otherConcerns();
    await this.submitEvent();
  }
};