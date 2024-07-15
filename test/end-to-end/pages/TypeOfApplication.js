const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    nextStepField: '#next-step',
    eventSelectField: 'select[id="next-step"]',
    eventName: 'Type of application',
    submit: 'button[type="submit"]',
    childArrangementsOrder: 'input[id="ordersApplyingFor-childArrangementsOrder"]',
    prohibitedStepsOrder: 'input[id="ordersApplyingFor-prohibitedStepsOrder"]',
    specificIssueOrder: 'input[id="ordersApplyingFor-specificIssueOrder"]',
    textAreaText: 'Testing text area',
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
    typeOfChildArrangementsOrder: '#typeOfChildArrangementsOrder-bothLiveWithAndSpendTimeWithOrder',
    nonMolestationOrder: '#typeOfApplicationOrders_orderType-nonMolestationOrder',
    occupationOrder: '#typeOfApplicationOrders_orderType-occupationOrder',
    ordersApplyingForPageHeader: 'Which order(s) are you applying for?',
    ordersApplyingForPageMandatoryText: 'Which order(s) are you applying for? is required',
    linkToChildArrangementsApplicationHeader: 'Is this linked to a C100 application? (Optional)',
    linkedChildArrangementsApplicationYes: '#typeOfApplicationLinkToCA_linkToCaApplication_Yes',
    childArrangementOrderInstructionText: 'If you have also completed a Child Arrangements Order application enter the case number below.',
    childArrangementCaseNumberLabel: 'Child Arrangements Case Number (FamilyMan cases not supported) (Optional)',
    childArrangementsCaseNumberField: '#typeOfApplicationLinkToCA_caApplicationNumber',
    // Case Number Regex validation error message to be introduced
    childArrangementsCaseNumberText: '1234123412341234',
    checkYourAnswersPageHeader: 'Check your answers'
  },

  async actionTypeOfApplicationEvent() {
    await I.triggerEvent(this.fields.eventName);
    // await I.retry(retryCount).waitForText(this.fields.eventName);
    // await I.retry(retryCount).selectOption(this.fields.eventSelectField, this.fields.eventName);
    // await I.retry(retryCount).waitForEnabled(this.fields.submit);
    // await I.retry(retryCount).click(this.fields.submit);
  },

  async whatOrdersPageC100() {
    await I.retry(retryCount).waitForText('What order(s) are you applying for?');
    await I.retry(retryCount).click(this.fields.childArrangementsOrder);
    await I.retry(retryCount).click(this.fields.prohibitedStepsOrder);
    await I.retry(retryCount).click(this.fields.specificIssueOrder);
    await I.retry(retryCount).click(this.fields.typeOfChildArrangementsOrder);
    await I.retry(retryCount).fillField('#natureOfOrder', 'Test text');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async draftConsentOrderC100() {
    await I.retry(retryCount).waitForText('Do you have a draft consent order?');
    await I.retry(retryCount).click(this.fields.consentOrderYes);
    await I.retry(retryCount).attachDocument('draftConsentOrderFile');
    await I.retry(retryCount).wait('15');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },

  async permissionsPageC100() {
    await I.retry(retryCount).waitForText('Have you applied to the court for permission to make this application?');
    await I.retry(retryCount).click(this.fields.permissionRequiredRadioButton);
    await I.retry(retryCount).fillField(this.fields.appPermissionRequiredReason, 'Test Text');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async briefDetailsPageC100() {
    await I.retry(retryCount).waitForText('Provide brief details of:');
    await I.retry(retryCount).fillField(this.fields.appDetailsTextArea, 'Test Text');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click(this.fields.submit);
  },

  async checkYourAnswersPageC100() {
    await I.retry(retryCount).waitForText(this.fields.checkYourAnswersPageHeader);
    await I.runAccessibilityTest();
    await I.retry(retryCount).click('Save and continue');
  },

  async ordersApplyingForPageFL401() {
    await I.retry(retryCount).waitForText(this.fields.ordersApplyingForPageHeader);
    // Checking mandatory field validation
    await I.retry(retryCount).click(this.fields.submit);
    await I.retry(retryCount).waitForText(this.fields.ordersApplyingForPageMandatoryText);
    await I.retry(retryCount).click(this.fields.nonMolestationOrder);
    await I.retry(retryCount).click(this.fields.occupationOrder);
    await I.runAccessibilityTest();
    I.wait('5');
    await I.retry(retryCount).continueEvent();
  },

  async linkToChildArrangementsApplicationFL401() {
    await I.retry(retryCount).waitForText(this.fields.linkToChildArrangementsApplicationHeader);
    await I.retry(retryCount).click(this.fields.linkedChildArrangementsApplicationYes);
    await I.runAccessibilityTest();
    await I.retry(retryCount).waitForText(this.fields.childArrangementOrderInstructionText);
    await I.retry(retryCount).waitForText(this.fields.childArrangementCaseNumberLabel);
    // eslint-disable-next-line max-len
    await I.retry(retryCount).fillField(this.fields.childArrangementsCaseNumberField, this.fields.childArrangementsCaseNumberText);
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
  },

  async checkYourAnswersPageFL401() {
    // I.wait('5');
    await I.waitForText(this.fields.checkYourAnswersPageHeader);
    // await I.waitForText('Non-molestation order');
    // await I.retry(retryCount).waitForText(this.fields.childArrangementsCaseNumberText);
    await I.retry(retryCount).click('Save and continue');
    await I.amOnHistoryPageWithSuccessNotification();
    // await I.wait('20');
  },

  async typeOfApplicationEventC100() {
    await I.wait('5');
    await this.actionTypeOfApplicationEvent();
    await this.whatOrdersPageC100();
    await this.draftConsentOrderC100();
    await this.permissionsPageC100();
    await this.briefDetailsPageC100();
    await this.checkYourAnswersPageC100();
  },

  async typeOfApplicationEventFL401() {
    await this.actionTypeOfApplicationEvent();
    await this.ordersApplyingForPageFL401();
    await this.linkToChildArrangementsApplicationFL401();
    await this.checkYourAnswersPageFL401();
  }
};
