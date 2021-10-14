const I = actor();

module.exports = {

  fields: {
    nextStepField: '#next-step',
    eventSelectField: 'select[id="next-step"]',
    eventName: 'Type of application',
    submit: 'button[type="submit"]',
    childArrangementsOrder: 'input[id="OrdersApplyingFor-childArrangementsOrder"]',
    prohibitedStepsOrder: 'input[id="OrdersApplyingFor-prohibitedStepsOrder"]',
    specificIssueOrder: 'input[id="OrdersApplyingFor-specificIssueOrder"]',
    textareaText: 'Testing text area',
    natureOfOrderTextArea: 'textarea[id="NatureOfOrder"]',
    noPermissionRequiredRadioButton: 'input[id="ApplicationPermissionRequired-noNotRequired"]',
    appDetailsTextArea: 'textarea[id="ApplicationDetails"]',
    appUrgentInput: 'input[id="IsApplicationUrgent_Yes"]',
    appUrgencyOrdersSoughtTextArea: 'textarea[id="ApplicationUrgencyOrders"]',
    appReasonsForUrgencyTextArea: 'textarea[id="ApplicationReasonsForUrgency"]',
    appConsideredDay: 'input[id="ApplicationConsideredInDaysAndHours_days"]',
    appConsideredHour: 'input[id="ApplicationConsideredInDaysAndHours_hours"]',
    appNoticeEffortsTextArea: 'textarea[id="ApplicationNoticeEfforts"]',
    appWithoutNotice: 'input[id="IsApplicationConsideredWithoutNotice_Yes"]',
    appWithoutNoticeReasons: 'textarea[id="ApplicationWithoutNoticeReasons"]',
    appWithoutNoticeNotPossible: 'input[id="IsHearingWithoutNoticeRequiredNotPossible_Yes"]',
    appWithoutNoticeNotPossibleReason: 'textarea[id="ApplicationWithoutNoticeNotPossibleReasons"]',
    appWithoutNoticeRespondentWllFrustrate: 'input[id="IsHearingWithoutNoticeRequiredRespondentWillFrustrate_Yes"]',
    appWithoutNoticeRespondentWllFrustrateTextArea: 'textarea[id="ApplicationWithoutNoticeRespondentWillFrustrateReasons"]',
    consentOrderYes: '#ConsentOrder_Yes',
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
    await I.waitForEnabled(this.fields.natureOfOrderTextArea);
    await I.fillField(this.fields.natureOfOrderTextArea, this.fields.textareaText);
    await I.click(this.fields.submit);
  },

  async draftConsentOrder() {
    await I.waitForText('Do you have a draft consent order?');
    await I.click(this.fields.consentOrderYes);
    await I.attachDocument('DraftConsentOrderFile');
    await I.wait('5');
    await I.click('Continue');
  },

  async permissionsPage() {
    await I.waitForText('Have you applied to the court for permission to make this application?');
    await I.click(this.fields.noPermissionRequiredRadioButton);
    await I.click(this.fields.submit);
  },

  async briefDetailsPage() {
    await I.waitForText('Please give brief details:');
    await I.fillField(this.fields.appDetailsTextArea, this.fields.textareaText);
    await I.click(this.fields.submit);
  },

  async urgentAndNoticePage() {
    await I.waitForText('Is this an urgent or without notice application?');
    await I.click(this.fields.appUrgentInput);
    await I.waitForEnabled(this.fields.appUrgencyOrdersSoughtTextArea);
    await I.fillField(this.fields.appUrgencyOrdersSoughtTextArea, this.fields.textareaText);
    await I.fillField(this.fields.appReasonsForUrgencyTextArea, this.fields.textareaText);
    await I.fillField(this.fields.appConsideredDay, '5');
    await I.fillField(this.fields.appConsideredHour, '5');
    await I.fillField(this.fields.appNoticeEffortsTextArea, this.fields.textareaText);
    await I.click(this.fields.appWithoutNotice);
    await I.waitForEnabled(this.fields.appWithoutNoticeReasons);
    await I.fillField(this.fields.appWithoutNoticeReasons, this.fields.textareaText);
    await I.click(this.fields.appWithoutNoticeNotPossible);
    await I.waitForEnabled(this.fields.appWithoutNoticeNotPossibleReason);
    await I.fillField(this.fields.appWithoutNoticeNotPossibleReason, this.fields.textareaText);
    await I.click(this.fields.appWithoutNoticeRespondentWllFrustrate);
    await I.waitForEnabled(this.fields.appWithoutNoticeRespondentWllFrustrateTextArea);
    await I.fillField(this.fields.appWithoutNoticeRespondentWllFrustrateTextArea, this.fields.textareaText);
    await I.click(this.fields.submit);
  },

  async checkYourAnswersPage() {
    await I.waitForText('Check your answers');
    await I.waitForText(this.fields.textareaText);
    await I.seeDocuments('Draft Consent Order','dummy.pdf')
    await I.click(this.fields.submit);

  },

  async typeOfApplicationEvent() {
    await this.actionTypeOfApplicationEvent();
    await this.whatOrdersPage();
    await this.draftConsentOrder();
    await this.permissionsPage();
    await this.briefDetailsPage();
    await this.urgentAndNoticePage();
    await this.checkYourAnswersPage();
  }

};
