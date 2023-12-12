const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    hearingTypes: '#ordersHearingDetails_0_hearingTypes',
    hearingOption1: 'The date is reserved with List Assist',
    hearingEstimatedDays: '#ordersHearingDetails_0_hearingEstimatedDays',
    hearingTelephoneChannels: '#ordersHearingDetails_0_hearingTelephoneChannels',
    allPartiesAttendHearingSameWayYesOrNo_Yes: '#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_Yes',
    courtList: '#ordersHearingDetails_0_courtList',
    hearingJudgeNameAndEmail: '#ordersHearingDetails_0_hearingJudgeNameAndEmail',
    additionalHearingDetails: '#ordersHearingDetails_0_additionalHearingDetails',
    instructionsForRemoteHearing: '#ordersHearingDetails_0_instructionsForRemoteHearing',
    calendarLink: '[aria-label = "Open calendar"]',
    selectDate: 'td.mat-calendar-body-cell.mat-calendar-body-active.ng-star-inserted > div.mat-calendar-body-cell-content.mat-focus-indicator.mat-calendar-body-selected',
    confirmDate: '.datepicker-container input'

  },
  async fillHearingDetails() {
    await I.waitForElement(this.fields.hearingTypes);
    await I.retry(retryCount).selectOption(this.fields.hearingTypes, 'Allocation');
    await I.retry(retryCount).click('The date is reserved with List Assist');
    await I.retry(retryCount).click('Add new');
    await I.click(this.fields.calendarLink);
    await I.wait('2');
    await I.fillField(this.fields.confirmDate, '20-04-2024');
    await I.retry(retryCount).fillField(this.fields.hearingEstimatedDays, '5');
    await I.retry(retryCount).click('Telephone');
    await I.retry(retryCount).click(this.fields.allPartiesAttendHearingSameWayYesOrNo_Yes);
    await I.retry(retryCount).selectOption(this.fields.courtList, 'Aberystwyth Justice Centre - Trefechan - SY23 1AS');
    await I.retry(retryCount).click('Magistrates');
    await I.retry(retryCount).fillField(this.fields.additionalHearingDetails, 'ADDITIONAL HEARING DETAILS');
    await I.retry(retryCount).fillField(this.fields.instructionsForRemoteHearing, 'JOINING INSTRUCTIONS');
    await I.runAccessibilityTest();
    await I.retry(retryCount).click('Continue');
    await I.wait('4');
  }

};