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

    await I.retry(retryCount).click('This order will be served with the \'date to be fixed\'');
    await I.runAccessibilityTest();
    await I.retry(retryCount).continueEvent();
    await I.wait('4');
  }

};