const I = actor();

module.exports = {

  fields: {
    headerText: 'Without notice order',
    submit: 'button[type="submit"]',
    applicantAddress: 'applicants_0_address_address',
    organisation: 'AAT',
    orderWithoutNoticeSelectYes: '//input[@id="orderWithoutGivingNoticeToRespondent_orderWithoutGivingNotice_Yes"]',
    harmToApplicantOrChild: '//input[@id="reasonForOrderWithoutGivingNotice_reasonForOrderWithoutGivingNotice-harmToApplicantOrChild"]',
    deferringApplicationIfNotImmediate: '//input[@id="reasonForOrderWithoutGivingNotice_reasonForOrderWithoutGivingNotice-deferringApplicationIfNotImmediate"]',
    reasonForOrderWithoutGivingNotice: '//input[@id="reasonForOrderWithoutGivingNotice_reasonForOrderWithoutGivingNotice-prejudiced"]',
    reasonForOrderWithoutGivingNoticeFurtherDetails: '#reasonForOrderWithoutGivingNotice_futherDetails',
    selectBailConditionYes: '//input[@id="bailDetails_isRespondentAlreadyInBailCondition-yes"]',
    bailConditionEndDay: '//input[@id="bailConditionEndDate-day"]',
    bailConditionEndMonth: '//input[@id="bailConditionEndDate-month"]',
    bailConditionEndYear: '//input[@id="bailConditionEndDate-year"]',
    otherDetails: '#anyOtherDtailsForWithoutNoticeOrder_otherDetails'
  },

  async triggerEvent() {
    await I.triggerEvent('Without Notice Order');
  },

  async fillDetailsWithoutNoticeOrder() {
    const retryCount = 3;
    await I.triggerEvent(this.fields.headerText);
    await I.waitForPage('h1', this.fields.headerText);
    I.wait('2');
    await I.retry(retryCount).checkOption(this.fields.orderWithoutNoticeSelectYes);
    await I.click(this.fields.submit);
    await I.retry(retryCount).checkOption(this.fields.harmToApplicantOrChild);
    await I.retry(retryCount).checkOption(this.fields.deferringApplicationIfNotImmediate);
    await I.retry(retryCount).checkOption(this.fields.reasonForOrderWithoutGivingNotice);
    await I.fillField(this.fields.reasonForOrderWithoutGivingNoticeFurtherDetails, 'Further Optional Details');
    I.wait('2');
    await I.click(this.fields.submit);
    I.wait('3');
    await I.retry(retryCount).checkOption(this.fields.selectBailConditionYes);
    I.wait('2');
    await I.fillField(this.fields.bailConditionEndDay, '21');
    await I.fillField(this.fields.bailConditionEndMonth, '2');
    await I.fillField(this.fields.bailConditionEndYear, '2021');
    I.wait('3');
    await I.click(this.fields.submit);
    I.wait('3');
    await I.fillField(this.fields.otherDetails, 'Other Details');
    I.wait('3');
    await I.click(this.fields.submit);
  },

  async fillDetailsWithoutNoticeOrderHappyPath() {
    await this.triggerEvent();
    await this.fillDetailsWithoutNoticeOrder();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
