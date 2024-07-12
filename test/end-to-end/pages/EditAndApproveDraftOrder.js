
const I = actor();
const retryCount = 3;
const longWait = 30;
const medWait = 10;
const testLogger = require('../helpers/testLogger');

module.exports = {

  fields: {
    orderByConsent_Yes: '#isTheOrderByConsent_Yes',
    draftOrdersDynamicList: '#draftOrdersDynamicList',
    tasksTab: '//div[contains(text(), "Tasks")]',
    rolesAndAccessTab: '//div[contains(text(), "Roles and access")]',
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
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
  },

  async assignReviewTask() {
    await I.wait(medWait);
    await I.click(this.fields.rolesAndAccessTab);
    await I.wait(1);
    await I.click(this.fields.tasksTab);

    await I.wait(longWait);

    let retryCtr = 0;
    while (retryCtr < '3') {
      retryCtr += 1;
      try {
        // eslint-disable-next-line no-await-in-loop
        await I.reloadPage(this.fields.assignToMe);
        // eslint-disable-next-line no-await-in-loop
        await I.waitForElement(this.fields.assignToMe);
        break;
      } catch (stepError) {
        // eslint-disable-next-line no-await-in-loop
        await I.click(this.fields.rolesAndAccessTab);
        // eslint-disable-next-line no-await-in-loop
        await I.wait('1');
        // eslint-disable-next-line no-await-in-loop
        await I.click(this.fields.tasksTab);

        testLogger.AddMessage(stepError);
      }
    }

    await I.click(this.fields.assignToMe);

    await I.reloadPage(this.fields.issueTaskName);
    await I.waitForElement(this.fields.issueTaskName, medWait);
    await I.click(this.fields.issueTaskName);
  },

  async approveTheOrder() {
    await I.waitForElement(this.fields.selectDraftOrderForEditing, longWait);
    await I.waitForText('Select the order', '5000');
    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectDraftOrderForEditing, option);
    await I.continueEvent();

    await I.click(this.fields.serveToAdmin);
    await I.continueEvent();

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