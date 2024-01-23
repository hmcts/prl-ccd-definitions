const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    orderByConsent_Yes: '#isTheOrderByConsent_Yes',
    draftOrdersDynamicList: '#draftOrdersDynamicList',
    draftOrdersDynamicListOption: '//select[@id="draftOrdersDynamicList"]/option[2]',
    instructionsToLegalRepresentative: '//input[@id="instructionsToLegalRepresentative"]',
    tabSelector: '//div[contains(text(), "Draft orders")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron'
  },

  async verifyDraftOrderSubmission() {
    await I.wait('2');
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.tabSelector);
    await I.runAccessibilityTest();
    await I.waitForText('Rejected by Judge');
  },

  async selectOrderForJudgeReview() {
    await I.retry(retryCount).triggerEvent('Edit and approve a draft order');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Edit and approve a draft order');
    const option = await I.grabTextFrom(this.fields.draftOrdersDynamicListOption);
    await I.selectOption(this.fields.draftOrdersDynamicList,option);
    await I.wait('2');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
    await I.retry(retryCount).waitForText('What do you want to do with this order?');
    await I.retry(retryCount).click('Ask the legal representative to make changes');
    await I.retry(retryCount).waitForText('Give instructions to the legal representative');
    await I.runAccessibilityTest();
    await I.retry(retryCount).fillField(this.fields.instructionsToLegalRepresentative,'Reject solicitor draft order');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');

    await I.retry(retryCount).waitForText('Check your answers');
    await I.retry(retryCount).click('Submit');
    await I.wait('2');
    
    await I.retry(retryCount).click('Close and Return to case details');
    await I.wait('2')
    await I.retry(retryCount).verifyDraftOrderSubmission();
  }
};
