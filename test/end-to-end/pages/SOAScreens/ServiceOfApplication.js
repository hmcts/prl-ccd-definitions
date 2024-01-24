'use strict';
const I = actor();

const soaConfig = require('./soaConfig');

const date = new Date();

module.exports = {
  fields: {
    proceedToServing: '#proceedToServing_Yes',
    selectOrder: '[name=\'serviceOfApplicationScreen1\']',
    p63FileUpload: '#pd36qLetter',
    serveToRespondentOption: '#soaServeToRespondentOptions_Yes',
    applicantRep: '#soaServingRespondentsOptionsCA-applicantLegalRepresentative',
    cafcassOption: '#soaCafcassCymruServedOptions_No',
    soaTab: '//div[contains(text(), \'Service of application\')]',
    expandEle: '//td/div/a',
    docAttachedField: '//span/ccd-field-read/div/ccd-field-read-label/div/ccd-read-text-area-field/span'
  },

  async selectEvent() {
    await I.triggerEvent(soaConfig.soaEvent);
    await I.waitForText(soaConfig.stillServeQuestion);
    await I.click(this.fields.proceedToServing);
    await I.click(soaConfig.continueText);
  },

  async uploadDocumentsToBeServed() {
    await I.waitForText(soaConfig.documentSelectionText);
    await I.click(this.fields.selectOrder);
    await I.see(soaConfig.c43AOrderText);
    await I.attachFile(this.fields.p63FileUpload, '../resource/dummy.pdf');
    await I.wait('3');
    await I.click(soaConfig.continueText);
  },

  async serveOrderType() {
    await I.waitForText(soaConfig.serveType);
    await I.click(this.fields.serveToRespondentOption);
    await I.waitForText(soaConfig.serveToRespondentOptions);
    await I.click(this.fields.applicantRep);
    await I.click(this.fields.cafcassOption);
    await I.click(soaConfig.continueText);
  },

  async submitOrderService() {
    await I.waitForText(soaConfig.cyaText);
    await I.see(soaConfig.appRepText);
    await I.click(soaConfig.saveAndContinue);
    await I.waitForText(soaConfig.appServedText);
    await I.click(soaConfig.returnToCaseDetails);
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async verifyServiceOfApplicationSubmission() {
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.clickTillElementFound(this.fields.soaTab, this.fields.nextBtnSelector);
    await I.click(this.fields.soaTab);

    await I.waitForText(soaConfig.notificationText);
    await I.click(this.fields.expandEle);
    await I.waitForText('Legal Solicitor');
    await I.waitForText('By email');
    await I.seeInField(this.fields.docAttachedField, soaConfig.docsAttached);
    await I.see(soaConfig.recpEmail);
    await I.see(formattedDate);
    await I.see(soaConfig.servedParty);
  },

  async performServiceOfApplication() {
    await this.selectEvent();
    await this.uploadDocumentsToBeServed();
    await this.serveOrderType();
    await this.submitOrderService();
    await this.verifyServiceOfApplicationSubmission();
  }
};