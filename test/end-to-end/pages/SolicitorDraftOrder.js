const I = actor();
const retryCount = 3;
const manageOrder = require('./ManageOrders');
const powerOfArrestOrderScreen = require('./PowerofarrestFL406');

module.exports = {

  fields: {
    blankOrderHearingOutcome: '#fl404CustomFields_fl404bHearingOutcome',
    hasJudgeProvidedHearingDetails_Yes: '#hasJudgeProvidedHearingDetails_Yes',
    hasJudgeProvidedHearingDetails_No: '#hasJudgeProvidedHearingDetails_No',
    hearingTypes: '#ordersHearingDetails_0_hearingTypes',
    hearingOption1: 'The date is reserved with List Assist',
    hearingEstimatedDays: '#ordersHearingDetails_0_hearingEstimatedDays',
    hearingTelephoneChannels: '#ordersHearingDetails_0_hearingTelephoneChannels',
    allPartiesAttendHearingSameWayYesOrNo_Yes: '#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_Yes',
    courtList: '#ordersHearingDetails_0_courtList',
    hearingJudgeNameAndEmail: '#ordersHearingDetails_0_hearingJudgeNameAndEmail',
    additionalHearingDetails: '#ordersHearingDetails_0_additionalHearingDetails',
    instructionsForRemoteHearing: '#ordersHearingDetails_0_instructionsForRemoteHearing'
  },
  async solicitorDraftAnOrderPowerOfArrestFL406() {
    await I.retry(retryCount).triggerEvent('Draft an order');
    await I.wait('2');
    await this.draftAnOrderModeOfOrder('Draft an order');
    await this.selectTypeOfOrderForDraftAnOrder('Power of arrest (FL406)');
    await I.wait('2');
    await manageOrder.fillGenericScreen();
    await I.retry(retryCount).waitForText('Is the order about the children?');
    await I.retry(retryCount).click(manageOrder.fields.isTheOrderAboutChildrenDA_No);
    await I.retry(retryCount).fillField(manageOrder.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).continueEvent();
    await I.wait('7');
    await powerOfArrestOrderScreen.fillPowerOfArrestOrderScreen();
    await this.previewTheOrder();
    await manageOrder.checkYourAnswersAndSubmit();
  },
  async solicitorDraftAnOrderBlankOrderFL404B() {
    await I.retry(retryCount).triggerEvent('Draft an order');
    await I.wait('2');
    await this.draftAnOrderModeOfOrder('Draft an order');
    await this.selectTypeOfOrderForDraftAnOrder('Blank order (FL404B)');
    await I.wait('2');
    await manageOrder.fillGenericScreen();
    await I.retry(retryCount).waitForText('Is the order about the children?');
    await I.retry(retryCount).click(manageOrder.fields.isTheOrderAboutChildrenDA_No);
    await I.retry(retryCount).fillField(manageOrder.fields.recticalsOrPreambels, 'TEST PREAMBLE');
    await I.retry(retryCount).fillField(manageOrder.fields.orderDirections, 'TEST DIRECTIONS');
    await I.retry(retryCount).fillField(manageOrder.fields.furtherDirections, 'TEST FURTHER DIRECTIONS');
    await I.retry(retryCount).fillField(manageOrder.fields.furtherInformation, 'TEST FURTHER INFORMATION');
    await I.retry(retryCount).continueEvent();
    await I.wait('7');
    await I.retry(retryCount).waitForText('Hearing outcome');
    await I.retry(retryCount).fillField(this.fields.blankOrderHearingOutcome, 'TEST HEARING OUTCOME');
    await I.retry(retryCount).continueEvent();
    await I.wait('7');
    await I.retry(retryCount).click(this.fields.hasJudgeProvidedHearingDetails_Yes);
    await I.wait('2');
    await this.fillHearingDetails();
    await this.previewTheOrder();
    await manageOrder.checkYourAnswersAndSubmit();
  },
  async fillHearingDetails() {
    await I.retry(retryCount).selectOption(this.fields.hearingTypes, 'Allocation');
    await I.retry(retryCount).fillField(this.fields.hearingEstimatedDays, '5');
    await I.retry(retryCount).click('Telephone');
    await I.retry(retryCount).selectOption(this.fields.hearingTypes, 'Telephone - BTMeetme');
    await I.retry(retryCount).click(this.fields.allPartiesAttendHearingSameWayYesOrNo_Yes);
    await I.retry(retryCount).selectOption(this.fields.courtList, 'Aberystwyth Justice Centre - Trefechan - SY23 1AS');
    await I.retry(retryCount).click('Magistrates');
    await I.retry(retryCount).fillField(this.fields.additionalHearingDetails, 'ADDITIONAL HEARING DETAILS');
    await I.retry(retryCount).fillField(this.fields.instructionsForRemoteHearing, 'JOINING INSTRUCTIONS');
    await I.retry(retryCount).continueEvent();
    await I.wait('4');
  },
  async draftAnOrderModeOfOrder(modeOfOrder) {
    await I.runAccessibilityTest();
    await I.retry(retryCount).triggerEvent('Draft an order');
    await I.wait('2');
    await I.retry(retryCount).waitForText('What do you want to do?');
    await I.retry(retryCount).click(modeOfOrder);
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },
  async selectTypeOfOrderForDraftAnOrder(orderName) {
    await I.runAccessibilityTest();
    await I.retry(retryCount).waitForText('Draft an order');
    await I.retry(retryCount).waitForText('Select order');
    await I.retry(retryCount).click(orderName);
    await I.retry(retryCount).continueEvent();
    await I.wait('5');
  },
  async previewTheOrder() {
    await I.retry(retryCount).waitForText('Preview the order');
    await I.retry(retryCount).waitForText('draft.pdf');
    await I.retry(retryCount).continueEvent();
    await I.wait('5');
  }

};