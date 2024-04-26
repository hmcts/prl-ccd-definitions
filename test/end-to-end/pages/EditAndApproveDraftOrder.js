
const I = actor();
const retryCount = 3;
const longWait = 30;
const medWait = 10;

module.exports = {

  fields: {
    orderByConsent_Yes: '#isTheOrderByConsent_Yes',
    draftOrdersDynamicList: '#draftOrdersDynamicList',
    tasksTab: '//div[contains(text(), "Tasks")]',
    assignToMe: '//a[@id="action_claim"]',
    issueTaskName: '//a[contains(.,"Review and Approve Admin Order")]',
    selectDraftOrderForEditing: '#draftOrdersDynamicList',
    serveToAdmin: '#whatToDoWithOrderCourtAdmin-sendToAdminToServe',
    successElement: 'div.alert-message',
    tabSelector: '//div[contains(text(), "Draft orders")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron',
    prevBtnSelector: '.mat-tab-header-pagination-before  .mat-tab-header-pagination-chevron'
  },


  async selectOrderForJudgeReview() {
    await I.retry(retryCount).triggerEvent('Edit and approve a draft order');
    await I.wait('2');
    await I.retry(retryCount).waitForText('Select the draft order for editing');
    await I.retry(retryCount).selectOption(this.fields.draftOrdersDynamicList, '1: Object');
    await I.retry(retryCount).click('Continue');
    await I.wait('2');
  },

  async assignReviewTask() {
    await I.wait(medWait);
    await I.click(this.fields.tasksTab);

    await I.wait(longWait);
    await I.reloadPage(this.fields.assignToMe);
    await I.waitForElement(this.fields.assignToMe);
    await I.click(this.fields.assignToMe);

    await I.reloadPage(this.fields.issueTaskName);
    await I.waitForElement(this.fields.issueTaskName, medWait);
    await I.click(this.fields.issueTaskName);
  },

  async approveTheOrder() {
    await I.waitForElement(this.fields.selectDraftOrderForEditing, longWait);
    await I.waitForText('Select the order');
    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectDraftOrderForEditing, option);
    await I.click('Continue');

    await I.click(this.fields.serveToAdmin);
    await I.click('Continue');

    await I.waitForText('Check your answers');
    await I.click('Submit');

    await I.waitForText('Order approved');
    await I.click('Close and Return to case details');
    await I.waitForElement(this.fields.successElement);
  },

  async verifyDraftOrderSubmission() {
    await I.clickTillElementFound(this.fields.tabSelector, this.fields.nextBtnSelector);
    await I.click(this.fields.tabSelector);

    await I.waitForText('Special guardianship order (C43A)');
    await I.waitForText('Reviewed by Manager');
  },


  async editDratOrderAsManager() {
    await this.assignReviewTask();
    await this.approveTheOrder();
    await this.verifyDraftOrderSubmission();
  }

};