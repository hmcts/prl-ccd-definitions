const I = actor();
const retryCount = 3;
const longWait = 30;
const medWait = 10;

const soaConfig = require('./soaConfig');

module.exports = {
  fields: {
    submit: 'button[type="submit"]',
    returnToTaskTab: 'div > div.govuk-form-group.govuk-form-group--error > a',
    assignToMe: '//exui-case-task/p/strong[contains(text(), "C8 - Confidential details check")]/../../dl/div[4]//dd/a',
    confidentialCheckTaskName: '//a[contains(.,"Confidential Check")]',
    applicationServedYesNo_Yes: '#applicationServedYesNo_Yes'
  },

  async confidentialityCheck() {
    await I.retry(retryCount).triggerEvent(soaConfig.confidentialityCheckEvent);
    await I.wait(longWait);
    await I.retry(retryCount).click(this.fields.returnToTaskTab);

    await I.wait(medWait);
    await I.reloadPage(this.fields.assignToMe);
    await I.waitForElement(this.fields.assignToMe);
    await I.retry(retryCount).click(this.fields.assignToMe);

    await I.waitForElement(this.fields.confidentialCheckTaskName, medWait);
    await I.reloadPage(this.fields.confidentialCheckTaskName);
    await I.waitForElement(this.fields.confidentialCheckTaskName);
    await I.retry(retryCount).click(this.fields.confidentialCheckTaskName);

    await I.waitForElement(this.fields.applicationServedYesNo_Yes, longWait);
    await I.waitForText(soaConfig.confidentialityCheckEvent);
    await I.retry(retryCount).click(this.fields.applicationServedYesNo_Yes);
    await I.retry(retryCount).click(soaConfig.continueText);

    await I.waitForText(soaConfig.cyaText);
    await I.waitForText(soaConfig.canApplicationServed);
    await I.retry(retryCount).click(soaConfig.saveAndContinue);
    await I.wait(medWait);
    await I.waitForText(soaConfig.confidentialityCheckConfirmationText);
    await I.retry(retryCount).click(soaConfig.returnToCaseDetails);
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
