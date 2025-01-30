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
    await I.wait('2');
    await I.runAccessibilityTest();
    await I.retry(retryCount).checkOption(this.fields.orderWithoutNoticeSelectYes);
    await I.click(this.fields.submit);
    await I.wait('3');
    await I.waitForElement(this.fields.harmToApplicantOrChild);
    await I.retry(retryCount).checkOption(this.fields.harmToApplicantOrChild);

    await I.waitForElement(this.fields.deferringApplicationIfNotImmediate);
    await I.retry(retryCount).checkOption(this.fields.deferringApplicationIfNotImmediate);

    await I.waitForElement(this.fields.reasonForOrderWithoutGivingNotice);
    await I.retry(retryCount).checkOption(this.fields.reasonForOrderWithoutGivingNotice);

    await I.waitForElement(this.fields.reasonForOrderWithoutGivingNoticeFurtherDetails);
    await I.fillField(this.fields.reasonForOrderWithoutGivingNoticeFurtherDetails, 'Further Optional Details');

    await I.wait('5');
    await I.click(this.fields.submit);
    await I.wait('3');

    await I.waitForElement(this.fields.selectBailConditionYes);
    await I.retry(retryCount).checkOption(this.fields.selectBailConditionYes);
    await I.wait('2');
    await I.fillField(this.fields.bailConditionEndDay, '21');
    await I.fillField(this.fields.bailConditionEndMonth, '2');
    await I.fillField(this.fields.bailConditionEndYear, '2021');
    await I.wait('3');
    await I.click(this.fields.submit);
    await I.waitForElement(this.fields.otherDetails);
    await I.fillField(this.fields.otherDetails, 'Other Details');
    await I.waitForElement(this.fields.submit);
    await I.click(this.fields.submit);
  },

  async fillDetailsWithoutNoticeOrderHappyPath() {
    // await this.triggerEvent();
    await this.fillDetailsWithoutNoticeOrder();
    await I.wait('5');
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
