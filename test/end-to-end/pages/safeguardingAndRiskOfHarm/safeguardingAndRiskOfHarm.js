const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    eventList: 'select[id="next-step"]',
    submit: 'button[type="submit"]',
    domesticAbuse: '//*[@id="domesticAbuse_Yes"]',
    childAbduction: '//*[@id="childAbduction_Yes"]',
    childAbuse: '//*[@id="childAbuse_Yes"]',
    drugsAndAlcohol: '//*[@id="drugsAlcoholSubstanceAbuse_No"]',
    otherSafety: '//*[@id="safetyWelfareConcerns_No"]',
    continueButton: 'div > button:nth-child(2)',

    childAtRisk: '//*[@id="childAtRiskOfAbduction_Yes"]',
    policeInformed: '//*[@id="policeNotified_No"]',
    childHasPassport: '//*[@id="childHasPassport_Yes"]',
    childMultiplePassport: '//*[@id="childHasMultiplePassports_Yes"]',
    childPassportPossession: '//*[@id="childPassportPossession-otherPerson"]',
    childPassportPossessionOtherDetails: '//*[@id="childPassportPossessionOtherDetails"]',
    childAbductedDetails: '//*[@id="childAbductedBefore_Yes"]',
    abductionDetails: '//*[@id="childAbductionDetails"]',
    policeInformedOnAbduction: '//*[@id="abductionPoliceInvolved_Yes"]',
    moreDetails: '//*[@id="abductionPoliceInvolvedDetails"]',
    reasonForAbduction: '//*[@id="childAtRiskOfAbductionReason"]',
    childWhereAbouts: '//*[@id="childWhereabouts"]',

    sexuallyAbused: '//*[@id="childAbuseSexually_No"]',
    physicallyAbused: '//*[@id="childAbusePhysically_Yes"]',
    natureOfBehaviour: '//*[@id="childAbusePhysicallyDetails"]',
    behaviourStartDay: '//*[@id="childAbusePhysicallyStartDate-day"]',
    behaviourStartMonth: '//*[@id="childAbusePhysicallyStartDate-month"]',
    behaviourStartYear: '//*[@id="childAbusePhysicallyStartDate-year"]',
    behaviourStillGoingOn: '//*[@id="childAbusePhysicallyOngoing_Yes"]',
    whoHelped: '//*[@id="childAbusePhysicallyHelpSought"]',
    financialAbuse: '//*[@id="childAbuseFinancially_No"]',
    domesticAbuseChildAbuse: '//*[@id="childAbuseDomestic_No"]',
    substanceAbuse: '//*[@id="childDrugsAlcoholSubstanceAbuse_No"]',
    welfareConcerns: '//*[@id="otherSafetyOrWelfareConcerns_No"]'
  },

  async triggerEvent(eventName) {
    await I.retry(retryCount).waitForElement(this.fields.eventList);
    await I.retry(retryCount).selectOption(this.fields.eventList, eventName);
    await I.retry(retryCount).click(this.fields.submit);
  },

  async safeguardingAndRiskOfHarm() {
    await I.retry(retryCount).waitForText('Safeguarding and risk of harm');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.domesticAbuse);
    await I.retry(retryCount).click(this.fields.childAbduction);
    await I.retry(retryCount).click(this.fields.childAbuse);
    await I.retry(retryCount).click(this.fields.drugsAndAlcohol);
    await I.retry(retryCount).click(this.fields.otherSafety);
    await I.retry(retryCount).click(this.fields.continueButton);
  },

  async childAbduction() {
    await I.retry(retryCount).waitForText('Child abduction');
    I.wait('2');
    await I.retry(retryCount).click(this.fields.childAtRisk);
    await I.retry(retryCount).click(this.fields.policeInformed);
    await I.retry(retryCount).click(this.fields.childHasPassport);
    await I.retry(retryCount).click(this.fields.childMultiplePassport);
    await I.retry(retryCount).click(this.fields.childPassportPossession);
    await I.retry(retryCount).fillField(this.fields.childPassportPossessionOtherDetails, 'Grandma');
    await I.retry(retryCount).click(this.fields.childAbductedDetails);
    await I.retry(retryCount).fillField(this.fields.abductionDetails, 'Abduction Details');
    await I.retry(retryCount).click(this.fields.policeInformedOnAbduction);
    await I.retry(retryCount).fillField(this.fields.moreDetails, 'Abduction details elaborated');
    await I.retry(retryCount).fillField(this.fields.reasonForAbduction, 'Reason for Abduction');
    await I.retry(retryCount).fillField(this.fields.childWhereAbouts, 'Took out of country');
    await I.retry(retryCount).click(this.fields.continueButton);
  },

  async childAbuse() {
    I.wait('2');
    await I.retry(retryCount).click(this.fields.sexuallyAbused);
    await I.retry(retryCount).click(this.fields.physicallyAbused);
    I.wait('1');
    await I.retry(retryCount).fillField(this.fields.natureOfBehaviour, 'Physically Abused');
    await I.retry(retryCount).fillField(this.fields.behaviourStartDay, '10');
    await I.retry(retryCount).fillField(this.fields.behaviourStartMonth, '10');
    await I.retry(retryCount).fillField(this.fields.behaviourStartYear, '2020');
    await I.retry(retryCount).click(this.fields.behaviourStillGoingOn);
    await I.retry(retryCount).fillField(this.fields.whoHelped, 'Who Helped');
    await I.retry(retryCount).click(this.fields.financialAbuse);
    await I.retry(retryCount).click(this.fields.domesticAbuseChildAbuse);
    await I.retry(retryCount).click(this.fields.substanceAbuse);
    await I.retry(retryCount).click(this.fields.welfareConcerns);
    await I.retry(retryCount).click(this.fields.continueButton);
  },

  async submitEvent() {
    I.wait('2');
    await I.retry(retryCount).waitForElement('h2');
    await I.retry(retryCount).see('Check your answers');
    await I.retry(retryCount).click('Save and continue');
  },

  async safeguardAndRiskOfHarmEvent() {
    await this.triggerEvent('Safeguarding and risk of harm');
    await this.safeguardingAndRiskOfHarm();
    await this.childAbduction();
    await this.childAbuse();
    await this.submitEvent();
  }
};