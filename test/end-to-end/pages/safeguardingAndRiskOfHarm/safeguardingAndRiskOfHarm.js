const I = actor();

module.exports = {

  fields: {
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    domesticAbuse: '//*[@id="DomesticAbuse_Yes"]',
    childAbduction: '//*[@id="ChildAbduction_Yes"]',
    childAbuse: '//*[@id="ChildAbuse_Yes"]',
    drugsAndAlcohol: '//*[@id="DrugsAlcoholSubstanceAbuse_No"]',
    otherSafety: '//*[@id="SafetyWelfareConcerns_No"]',
    continueButton: 'div > button:nth-child(2)',

    childAtRisk: '//*[@id="ChildAtRiskOfAbduction_Yes"]',
    policeInformed: '//*[@id="PoliceNotified_No"]',
    childHasPassport: '//*[@id="ChildHasPassport_Yes"]',
    childMultiplePassport: '//*[@id="ChildHasMultiplePassports_Yes"]',
    childPassportPossession: '//*[@id="ChildPassportPossession-other-person"]',
    childPassportPossessionOtherDetails: '//*[@id="ChildPassportPossessionOtherDetails"]',
    childAbductedDetails: '//*[@id="ChildAbductedBefore_Yes"]',
    abductionDetails: '//*[@id="ChildAbductionDetails"]',
    policeInformedOnAbduction: '//*[@id="AbductionPoliceInvolved_Yes"]',
    moreDetails: '//*[@id="AbductionPoliceInvolvedDetails"]',
    reasonForAbduction: '//*[@id="ChildAtRiskOfAbductionReason"]',
    childWhereAbouts: '//*[@id="ChildWhereabouts"]',

    sexuallyAbused: '//*[@id="ChildAbuseSexually_No"]',
    physicallyAbused: '//*[@id="ChildAbusePhysically_Yes"]',
    natureOfBehaviour: '//*[@id="ChildAbusePhysicallyDetails"]',
    behaviourStartDay: '//*[@id="ChildAbusePhysicallyStartDate-day"]',
    behaviourStartMonth: '//*[@id="ChildAbusePhysicallyStartDate-month"]',
    behaviourStartYear: '//*[@id="ChildAbusePhysicallyStartDate-year"]',
    behaviourStillGoingOn: '//*[@id="ChildAbusePhysicallyOngoing_Yes"]',
    whoHelped: '//*[@id="ChildAbusePhysicallyHelpSought"]',
    financialAbuse: '//*[@id="ChildAbuseFinancially_No"]',
    domesticAbuseChildAbuse: '//*[@id="ChildAbuseDomestic_No"]',
    substanceAbuse: '//*[@id="ChildDrugsAlcoholSubstanceAbuse_No"]',
    welfareConcerns: '//*[@id="OtherSafetyOrWelfareConcerns_No"]'
  },

  async triggerEvent(eventName) {
    await I.waitForElement(this.fields.eventList);
    await I.selectOption(this.fields.eventList, eventName);
    await I.click(this.fields.submit);
  },

  async safeguardingAndRiskOfHarm() {
    await I.waitForText('Safeguarding and risk of harm');
    I.wait('2');
    await I.click(this.fields.domesticAbuse);
    await I.click(this.fields.childAbduction);
    await I.click(this.fields.childAbuse);
    await I.click(this.fields.drugsAndAlcohol);
    await I.click(this.fields.otherSafety);
    await I.click(this.fields.continueButton);
  },

  async childAbduction() {
    await I.waitForText('Child abduction');
    I.wait('2');
    await I.click(this.fields.childAtRisk);
    await I.click(this.fields.policeInformed);
    await I.click(this.fields.childHasPassport);
    await I.click(this.fields.childMultiplePassport);
    await I.click(this.fields.childPassportPossession);
    await I.fillField(this.fields.childPassportPossessionOtherDetails, 'Grandma');
    await I.click(this.fields.childAbductedDetails);
    await I.fillField(this.fields.abductionDetails, 'Abduction Details');
    await I.click(this.fields.policeInformedOnAbduction);
    await I.fillField(this.fields.moreDetails, 'Abduction details elaborated');
    await I.fillField(this.fields.reasonForAbduction, 'Reason for Abduction');
    await I.fillField(this.fields.childWhereAbouts, 'Took out of country');
    await I.click(this.fields.continueButton);
  },

  async childAbuse() {
    I.wait('2');
    await I.click(this.fields.sexuallyAbused);
    await I.click(this.fields.physicallyAbused);
    I.wait('1');
    await I.fillField(this.fields.natureOfBehaviour, 'Physically Abused');
    await I.fillField(this.fields.behaviourStartDay, '10');
    await I.fillField(this.fields.behaviourStartMonth, '10');
    await I.fillField(this.fields.behaviourStartYear, '2020');
    await I.click(this.fields.behaviourStillGoingOn);
    await I.fillField(this.fields.whoHelped, 'Who Helped');
    await I.click(this.fields.financialAbuse);
    await I.click(this.fields.domesticAbuseChildAbuse);
    await I.click(this.fields.substanceAbuse);
    await I.click(this.fields.welfareConcerns);
    await I.click(this.fields.continueButton);
  },

  async submitEvent() {
    I.wait('2');
    await I.waitForElement('h2');
    await I.see('Check your answers');
    await I.click('Submit');
  },

  async safeguardAndRiskOfHarmEvent() {
    await this.triggerEvent('Safeguarding and risk of harm');
    await this.safeguardingAndRiskOfHarm();
    await this.childAbduction();
    await this.childAbuse();
    await this.submitEvent();
  }
};
