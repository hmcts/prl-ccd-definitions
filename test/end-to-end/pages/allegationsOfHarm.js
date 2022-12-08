const I = actor();
const retryCount = 3;

module.exports = {

 fields: {
    textareaText: 'Testing text area',
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    allegationsOfHarmYesNo: '//*[@id="newAllegationsOfHarmYesNo_Yes"]',
    newAllegationsOfHarmLabel: '//*[@id="newAllegationsOfHarmLabel"]',
    domesticAbuse: '//*[@id="newAllegationsOfHarmDomesticAbuseYesNo_Yes"]',
    childAbuse: '//*[@id="newAllegationsOfHarmChildAbuseYesNo_Yes"]',
    childAbduction: '//*[@id="newAllegationsOfHarmChildAbductionYesNo_Yes"]',
    substanceAbuse: '//*[@id="newAllegationsOfHarmSubstanceAbuseYesNo_Yes"]',
    substanceAbuseReason: '//*[@id="newAllegationsOfHarmSubstanceAbuseDetails"]',
    otherSafetyConcerns: '//*[@id="newAllegationsOfHarmOtherConcerns_Yes"]',
    otherSafetyConcernsReason: '//*[@id="newAllegationsOfHarmOtherConcernsDetails"]',
 
    //Orders Page
    ordersNonMolestationYes: '//*[@id="newOrdersNonMolestation_Yes"]',
    ordersOccupationNo: '//*[@id="newOrdersOccupation_No"]',
    ordersForcedMarriageProtectionNo: '//*[@id="newOrdersForcedMarriageProtection_No"]',
    ordersRestrainingNo: '//*[@id="newOrdersRestraining_No"]',
    ordersOtherInjunctiveNo: '//*[@id="newOrdersOtherInjunctive_No"]',

    //Domestic Abuse - Behaviours
    behaviourDAPhysicalAbuse: '//*[@id="domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_1"]',
    behaviourDANatureWhatWhoDescription: '//*[@id="domesticBehaviours_0_newAbuseNatureDescription"]',   
    behaviourDAStartDateAndLength: '//*[@id="domesticBehaviours_0_newBehavioursStartDateAndLength"]',
    behaviourDAApplicantSoughtHelp: '//*[@id="domesticBehaviours_0_newBehavioursApplicantSoughtHelp_Yes"]',
    behaviourDAWhoHelpFromDescription: '//*[@id="domesticBehaviours_0_newBehavioursApplicantHelpSoughtWho"]',

    //Child Abuse - Behaviours
    behaviourCAPhysicalAbuse: '//*[@id="childAbuseBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_1"]',
    behaviourCARisk: '//*[@id="childAbuseBehaviours_0_allChildrenAreRisk_Yes"]',
    behaviourCANatureWhatWhoDescription: '//*[@id="childAbuseBehaviours_0_newAbuseNatureDescription"]',   
    behaviourCAStartDateAndLength: '//*[@id="childAbuseBehaviours_0_newBehavioursStartDateAndLength"]',
    behaviourCAApplicantSoughtHelp: '//*[@id="childAbuseBehaviours_0_newBehavioursApplicantSoughtHelp_Yes"]',
    behaviourCAWhoHelpFromDescription: '//*[@id="childAbuseBehaviours_0_newBehavioursApplicantHelpSoughtWho"]',

    //Child Abduction Page
    abductionWhyDescription: '//*[@id="newChildAbductionReasons"]',
    abductionPreviousThreats: '//*[@id="newPreviousAbductionThreats_Yes"]',
    abductionPreviousThreatsDetails: '//*[@id="newPreviousAbductionThreatsDetails"]',
    abductionChildrenNowDescription: '//*[@id="newChildrenLocationNow"]',
    abductionPassportNotified: '//*[@id="newAbductionPassportOfficeNotified_Yes"]',
    abductionPoliceInvolced: '//*[@id="newAbductionPreviousPoliceInvolvement_Yes"]',
    abductionPoliceInvolvedDetails: '//*[@id="newAbductionPreviousPoliceInvolvementDetails"]',
    abductionChildrenHavePassport: '//*[@id="newAbductionChildHasPassport_Yes"]',
    abductionChildrenMorethanOnePassport: '//*[@id="childPassportDetails_newChildHasMultiplePassports_Yes"]',
    abductionChildPassportPossessionMother: '//*[@id="childPassportDetails_newChildPassportPossession-mother"]',
    abductionChildPassportOtherPossession: '//*[@id="childPassportDetails_newChildPassportPossessionOtherDetails"]',


    // OtherConcerns Page
    otherConcernsWhatSteps: '//*[@id="newAllegationsOfHarmOtherConcernsCourtActions"]',
    otherConcernsUnsupervisedTime: '//*[@id="newAgreeChildUnsupervisedTime_Yes"]',
    otherConcernsSupervisedTime: '//*[@id="newAgreeChildSupervisedTime_Yes"]',
    otherConcernsOtherFormsOfContact: '//*[@id="newAgreeChildOtherContact_Yes"]'


  },

    async triggerEvent(eventName) {
      await I.retry(retryCount).waitForElement(this.fields.eventList);
      await I.retry(retryCount).selectOption(this.fields.eventList, eventName);
      await I.retry(retryCount).click(this.fields.submit);
      I.wait('4');
    },

  async allegationsOfHarmForChildOrApplicant() {
    await I.retry(retryCount).waitForText('Allegations of harm');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.allegationsOfHarmYesNo);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
    I.wait('2');

  },


  async allegationsOfHarmInformation() {
    await I.retry(retryCount).click(this.fields.domesticAbuse);
    await I.retry(retryCount).click(this.fields.childAbuse);
    await I.retry(retryCount).click(this.fields.childAbduction);
    await I.retry(retryCount).click(this.fields.substanceAbuse);
    await I.retry(retryCount).fillField(this.fields.substanceAbuseReason, this.fields.textareaText);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.otherSafetyConcerns);
    await I.retry(retryCount).fillField(this.fields.otherSafetyConcernsReason, this.fields.textareaText);
    I.wait('2');

    //Orders
    const uploadTime = 5;
    await I.retry(retryCount).click(this.fields.ordersNonMolestationYes);
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationDateIssued-year"]', '2020');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-day"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-month"]', '1');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationEndDate-year"]', '2022');
    I.wait('1');
    await I.retry(retryCount).checkOption('//*[@id="newOrdersNonMolestationCurrent_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationCourtName"]', 'Court Name');
    await I.retry(retryCount).fillField('//*[@id="newOrdersNonMolestationCaseNumber"]', '1669-9873-4742-9548');
    await I.retry(retryCount).attachFile('//*[@id="newOrdersNonMolestationDocument"]', '../resource/dummy.pdf');
    await I.runAccessibilityTest();
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).click(this.fields.ordersOccupationNo);
    await I.retry(retryCount).click(this.fields.ordersForcedMarriageProtectionNo);
    await I.retry(retryCount).click(this.fields.ordersRestrainingNo);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.ordersOtherInjunctiveNo);
    await I.retry(retryCount).click('//*[@id="newOrdersUndertakingInPlace_No"]');
    I.wait('2');
    await I.retry(retryCount).click('Continue');

  },

  async domesticAbuseBehaviour() {

    //Domestic Abuse
    await I.retry(retryCount).waitForText('Domestic abuse - Behaviours');
    await I.retry(retryCount).click('Add new');
    I.wait('2');
    // eslint-disable-next-line max-len
    await I.retry(retryCount).click(this.fields.behaviourDAPhysicalAbuse);
    await I.retry(retryCount).fillField(this.fields.behaviourDANatureWhatWhoDescription, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.behaviourDAStartDateAndLength, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.behaviourDAApplicantSoughtHelp);
    await I.retry(retryCount).fillField('//*[@id="domesticBehaviours_0_newBehavioursApplicantHelpSoughtWho"]', this.fields.textareaText);
    await I.retry(retryCount).click('Continue');

    

  },

  async childAbuseBehaviour() {

    //Child Abuse
    await I.retry(retryCount).waitForText('Child abuse - Behaviours');
    await I.retry(retryCount).click('Add new');
    I.wait('2');
    // eslint-disable-next-line max-len
    await I.retry(retryCount).click(this.fields.behaviourCAPhysicalAbuse);
    await I.retry(retryCount).click(this.fields.behaviourCARisk);
    await I.retry(retryCount).fillField(this.fields.behaviourCANatureWhatWhoDescription, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.behaviourCAStartDateAndLength, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.behaviourCAApplicantSoughtHelp);
    await I.retry(retryCount).fillField('//*[@id="childAbuseBehaviours_0_newBehavioursApplicantHelpSoughtWho"]', this.fields.textareaText);
    I.wait('2');
    await I.retry(retryCount).click('Continue');

  },

  async childAbductionAOH() {
    await I.retry(retryCount).waitForText('Child abduction');
    await I.retry(retryCount).fillField(this.fields.abductionWhyDescription, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.abductionPreviousThreats);
    I.wait('2');
    await I.retry(retryCount).fillField(this.fields.abductionPreviousThreatsDetails, this.fields.textareaText);
    await I.retry(retryCount).fillField(this.fields.abductionChildrenNowDescription, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.abductionPassportNotified);
    await I.retry(retryCount).click(this.fields.abductionPoliceInvolced);
    await I.retry(retryCount).fillField(this.fields.abductionPoliceInvolvedDetails, this.fields.textareaText);
    await I.retry(retryCount).click(this.fields.abductionChildrenHavePassport);
    I.wait('2');
    await I.retry(retryCount).click(this.fields.abductionChildrenMorethanOnePassport);
    await I.retry(retryCount).click(this.fields.abductionChildPassportPossessionMother); 
    await I.retry(retryCount).fillField(this.fields.abductionChildPassportOtherPossession, this.fields.textareaText);
    I.wait('2');
    await I.retry(retryCount).click('Continue');
  },

  async otherConcerns() {
    await I.retry(retryCount).waitForText('Other concerns');
    await I.retry(retryCount).fillField(this.fields.otherConcernsWhatSteps, this.fields.textareaText);
    I.wait('2');
    await I.retry(retryCount).waitForText('Child contact');
    await I.retry(retryCount).click(this.fields.otherConcernsUnsupervisedTime);
    await I.retry(retryCount).click(this.fields.otherConcernsSupervisedTime);
    await I.retry(retryCount).click(this.fields.otherConcernsOtherFormsOfContact);
    I.wait('2');
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
    await this.allegationsOfHarmForChildOrApplicant();
    await this.allegationsOfHarmInformation()
    await this.domesticAbusebehaviour();
    await this.childAbusebehaviour();
    await this.childAbductionAOH();
    await this.otherConcerns();
    await this.submitEvent();
  }
};