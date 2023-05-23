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
    instructionsForRemoteHearing: '#ordersHearingDetails_0_instructionsForRemoteHearing'

  },
  async fillHearingDetails() {
    await I.retry(retryCount).selectOption(this.fields.hearingTypes, 'Allocation');
    await I.retry(retryCount).click('The date is reserved with List Assist');
    await I.retry(retryCount).click('Add new');
    await I.retry(retryCount).fillField(this.fields.hearingEstimatedDays, '5');
    await I.retry(retryCount).click('Telephone');
    await I.retry(retryCount).selectOption(this.fields.hearingTypes, 'Telephone - BTMeetme');
    await I.retry(retryCount).click(this.fields.allPartiesAttendHearingSameWayYesOrNo_Yes);
    await I.retry(retryCount).selectOption(this.fields.courtList, 'Aberystwyth Justice Centre - Trefechan - SY23 1AS');
    await I.retry(retryCount).click('Magistrates');
    await I.retry(retryCount).fillField(this.fields.additionalHearingDetails, 'ADDITIONAL HEARING DETAILS');
    await I.retry(retryCount).fillField(this.fields.instructionsForRemoteHearing, 'JOINING INSTRUCTIONS');
    await I.retry(retryCount).click('Continue');
    await I.wait('4');
  }

};
