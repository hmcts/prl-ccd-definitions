const I = actor();

module.exports = {

  fields: {
    nextStepField: '#next-step',
    eventSelectField: 'select[id="next-step"]',
    eventName: 'Type of application',
    submit: 'button[type="submit"]',
    childArrangementsOrder: 'input[id="ordersApplyingFor-childArrangementsOrder"]',
    prohibitedStepsOrder: 'input[id="ordersApplyingFor-prohibitedStepsOrder"]',
    specificIssueOrder: 'input[id="ordersApplyingFor-specificIssueOrder"]',
    textareaText: 'Testing text area',
    natureOfOrderTextArea: 'textarea[id="natureOfOrder"]',
    permissionRequiredRadioButton: 'input[id="applicationPermissionRequired-yes"]',
    appPermissionRequiredReason: 'textarea[id="applicationPermissionRequiredReason"]',
    appDetailsTextArea: 'textarea[id="applicationDetails"]',
    appUrgentInput: 'input[id="isApplicationUrgent_Yes"]',
    appUrgencyOrdersSoughtTextArea: 'textarea[id="applicationUrgencyOrders"]',
    appReasonsForUrgencyTextArea: 'textarea[id="applicationReasonsForUrgency"]',
    appConsideredDay: 'input[id="applicationConsideredInDaysAndHours_days"]',
    appConsideredHour: 'input[id="applicationConsideredInDaysAndHours_hours"]',
    appNoticeEffortsTextArea: 'textarea[id="applicationNoticeEfforts"]',
    appWithoutNotice: 'input[id="isApplicationConsideredWithoutNotice_Yes"]',
    appWithoutNoticeReasons: 'textarea[id="applicationWithoutNoticeReasons"]',
    appWithoutNoticeNotPossible: 'input[id="isHearingWithoutNoticeRequiredNotPossible_Yes"]',
    appWithoutNoticeNotPossibleReason: 'textarea[id="applicationWithoutNoticeNotPossibleReasons"]',
    appWithoutNoticeRespondentWllFrustrate: 'input[id="isHearingWithoutNoticeRequiredRespondentWillFrustrate_Yes"]',
    appWithoutNoticeRespondentWllFrustrateTextArea: 'textarea[id="applicationWithoutNoticeRespondentWillFrustrateReasons"]',
    consentOrderYes: '#consentOrder_Yes',
    typeOfChildArrangementsOrder: '#typeOfChildArrangementsOrder-bothLiveWithAndSpendTimeWithOrder'
  },

  async actionTypeOfApplicationEvent() {
    await I.waitForText(this.fields.eventName);
    await I.selectOption(this.fields.eventSelectField, this.fields.eventName);
    await I.waitForEnabled(this.fields.submit);
    await I.click(this.fields.submit);
  },

  async whatOrdersPage() {
    await I.waitForText('What order(s) are you applying for?');
    await I.click(this.fields.childArrangementsOrder);
    await I.click(this.fields.prohibitedStepsOrder);
    await I.click(this.fields.specificIssueOrder);
    await I.wait('5');
    await I.click(this.fields.typeOfChildArrangementsOrder);
    await I.waitForEnabled(this.fields.natureOfOrderTextArea);
    await I.fillField(this.fields.natureOfOrderTextArea, this.fields.textareaText);
    await I.click(this.fields.submit);
  },

  async draftConsentOrder() {
    await I.waitForText('Do you have a draft consent order?');
    await I.click(this.fields.consentOrderYes);
    await I.attachDocument('draftConsentOrderFile');
    await I.wait('5');
    await I.click('Continue');
  },

  async permissionsPage() {
    await I.waitForText('Have you applied to the court for permission to make this application?');
    await I.click(this.fields.permissionRequiredRadioButton);
    await I.fillField(this.fields.appPermissionRequiredReason, this.fields.textareaText);
    await I.click(this.fields.submit);
  },

  async briefDetailsPage() {
    await I.wait('2');
    await I.waitForText('Provide brief details of:');
    await I.fillField(this.fields.appDetailsTextArea, this.fields.textareaText);
    await I.click(this.fields.submit);
  },

  async checkYourAnswersPage() {
    await I.waitForText('Check your answers');
    await I.waitForText(this.fields.textareaText);
    await I.seeDocuments('Draft consent order', 'dummy.pdf');
    await I.click('Save and continue');
  },

  async typeOfApplicationEvent() {
    await this.actionTypeOfApplicationEvent();
    await this.whatOrdersPage();
    await this.draftConsentOrder();
    await this.permissionsPage();
    await this.briefDetailsPage();
    await this.checkYourAnswersPage();
  }

};