const I = actor();
const retryCount = 3;

const sosConfig = require('./sosConfig');
const soaConfig = require('./soaConfig.json');

module.exports = {
  fields: {
    applicationPackOption: '#stmtOfServiceWhatWasServed-statementOfServiceApplicationPack',
    whoWasServed: '//select[@id="stmtOfServiceAddRecipient_0_respondentDynamicList"]',
    whenServed: '.mat-datepicker-input',
    sosDoc: '#stmtOfServiceAddRecipient_0_stmtOfServiceDocument',
    signOut: '//a[contains(.,"Sign out")]',
    soaTab: '//div[contains(text(), \'Service of application\')]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron'
  },

  async completeStatementOfService() {
    await I.retry(retryCount).triggerEvent(sosConfig.sosEvent);
    await I.waitForText(sosConfig.sosEvent);
    await I.waitForText(sosConfig.whatServed);
    await I.waitForElement(this.fields.applicationPackOption, '3');
    await I.retry(retryCount).click(this.fields.applicationPackOption);
    await I.selectOption(this.fields.whoWasServed, sosConfig.respondent1);
    await I.retry(retryCount).fillField(this.fields.whenServed, sosConfig.whenServed);
    await I.attachFile(this.fields.sosDoc, '../resource/dummy.pdf');
    await I.wait('3');
    await I.retry(retryCount).click(sosConfig.continueBtn);

    await I.waitForText(sosConfig.sosEvent);
    await I.waitForText(sosConfig.cyaText);
    await I.waitForText(sosConfig.respondent1);
    await I.retry(retryCount).click(sosConfig.saveAndContinueBtn);
    await I.waitForText(sosConfig.sosConfirmationText);
    await I.retry(retryCount).click(soaConfig.returnToCaseDetails);
    await I.wait('3');
    await I.amOnHistoryPageWithSuccessNotification();
    await I.retry(retryCount).click(this.fields.signOut);
  },
  async verifyPostStatementOfService() {
    await I.waitForElement(this.fields.nextBtnSelector);
    await I.clickTillElementFound(this.fields.soaTab, this.fields.nextBtnSelector);
    await I.click(this.fields.soaTab);
    await I.see(sosConfig.sosEvent);
    await I.see(sosConfig.respondent1);
    await I.see('dummy.pdf');
  }
};
