'use strict';
const I = actor();

const soaConfig = require('./soaConfig');

const date = new Date();

module.exports = {
  fields: {
    proceedToServing: '#proceedToServing_Yes',
    selectOrder: '[name=\'serviceOfApplicationScreen1\']',
    p63FileUpload: '#pd36qLetter',
    specialArrangementsUpload: '#specialArrangementsLetter',
    serveToRespondentOption: '#soaServeToRespondentOptions_Yes',
    applicantRep: '#soaServingRespondentsOptionsCA-applicantLegalRepresentative',
    cafcassOption: '#soaCafcassCymruServedOptions_No',
    localAuthorityOption: '#soaServeLocalAuthorityYesOrNo_No',
    soaTab: '//div[contains(text(), \'Service of application\')]',
    expandEle: '//td/div/a',
    docAttachedField: '//tbody/tr[1]/td/ccd-field-read/div/ccd-field-read-label/div/ccd-read-complex-field/ccd-read-complex-field-table/div/table/tbody/tr[1]/td/span/ccd-field-read/div/ccd-field-read-label/div/ccd-read-text-area-field/span',
    doesLANeedsToBeServed_Yes: '#soaServeLocalAuthorityYesOrNo_Yes',
    laEmailAddress: '#soaLaEmailAddress',
    selectDocument: '#soaDocumentDynamicListForLa_0_documentsListForLa',
    c8Served_No: '#soaServeC8ToLocalAuthorityYesOrNo_No',
    serveToRespondentNoOption: '#soaServeToRespondentOptions_No',
    doesLANeedsToBeServed_No: '#soaServeLocalAuthorityYesOrNo_No',
    applicationServed: '#applicationServedYesNo_No',
    applicationServedYes: '#applicationServedYesNo_Yes',
    rejectionReason: '#rejectionReason',
    nextBtnSelector: '.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron'
  },

  async selectEvent() {
    await I.triggerEvent(soaConfig.soaEvent);
  },

  async uploadSpecialDocumentsToBeServed() {
    await I.triggerEvent(soaConfig.soaEvent);
    await I.attachFile(this.fields.specialArrangementsUpload, '../resource/dummy.pdf');
    await I.click(soaConfig.continueText);
  },

  async serveNonPersonalOrderType() {
    await I.waitForText(soaConfig.serveType);
    await I.click(this.fields.serveToRespondentNoOption);
    await I.click(soaConfig.applicant);
    await I.click(this.fields.cafcassOption);
    await I.click(this.fields.doesLANeedsToBeServed_No);
    await I.click(soaConfig.continueText);
  },


  async submitConfidentialService() {
    await I.waitForText(soaConfig.cyaText);
    await I.click(soaConfig.saveAndContinue);
    await I.waitForText(soaConfig.confidServeText);
    await I.click(soaConfig.returnToCaseDetails);
  },

  async noOptionConfidentialityCheck() {
    await I.triggerEvent(soaConfig.confidentialityCheck);
    await I.waitForText(soaConfig.applicationServedText);
    await I.click(this.fields.applicationServed);
    await I.fillField(this.fields.rejectionReason, 'Checking option No');
    await I.click(soaConfig.continueText);
  },


  async noConfirmationScreenAndVerification() {
    await I.waitForText(soaConfig.cyaText);
    await I.click(soaConfig.saveAndContinue);
    await I.waitForText(soaConfig.applicationcannotbeserved);
    await I.click(soaConfig.returnToCaseDetails);
    await I.clickTillElementFound(this.fields.soaTab, this.fields.nextBtnSelector);
    await I.click(this.fields.soaTab);
    await I.waitForText('Confidential check failed');
  },

  async yesConfidentialityCheck() {
    await I.triggerEvent(soaConfig.confidentialityCheck);
    await I.waitForText(soaConfig.applicationServedText);
    await I.click(this.fields.applicationServedYes);
    await I.click(soaConfig.continueText);
  },

  async yesConfirmationScreenAndVerification() {
    await I.waitForText(soaConfig.cyaText);
    await I.click(soaConfig.saveAndContinue);
    await I.waitForText(soaConfig.personalServiceText);
    await I.click(soaConfig.returnToCaseDetails);
    await I.clickTillElementFound(this.fields.soaTab, this.fields.nextBtnSelector);
    await I.click(this.fields.soaTab);
    await I.waitForText('Served pack');
  },

  async uploadDocumentsToBeServed() {
    await I.waitForText(soaConfig.documentSelectionText);
    await I.click(this.fields.selectOrder);
    await I.see(soaConfig.c43AOrderText);
    await I.attachFile(this.fields.p63FileUpload, '../resource/dummy.pdf');
    await I.attachFile(this.fields.specialArrangementsUpload, '../resource/dummy.pdf');
    await I.wait('3');
    await I.click(soaConfig.continueText);
  },



  async serveOrderType() {
    await I.waitForText(soaConfig.serveType);
    await I.click(this.fields.serveToRespondentOption);
    await I.waitForText(soaConfig.serveToRespondentOptions);
    await I.click(this.fields.applicantRep);
    await I.click(this.fields.cafcassOption);

    // Serve Local authority
    await I.click(this.fields.doesLANeedsToBeServed_Yes);
    await I.fillField(this.fields.laEmailAddress, 'test@gov.uk');

    const option = await I.grabTextFrom('//select[@id="soaDocumentDynamicListForLa_0_documentsListForLa"]/option[3]');
    await I.selectOption(this.fields.selectDocument, option);
    await I.click(this.fields.c8Served_No);
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
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, ' ');

    await I.clickTillElementFound(this.fields.soaTab, this.fields.nextBtnSelector);
    await I.click(this.fields.soaTab);

    await I.waitForText(soaConfig.notificationText);
    await I.click(this.fields.expandEle);
    await I.waitForText('Legal Solicitor');
    await I.waitForText('By email');
    // await I.seeInField(this.fields.docAttachedField, soaConfig.docsAttached);
    await I.see('C100FinalDocument.pdf');
    await I.see('C1A_Document.pdf');
    await I.see(soaConfig.recpEmail);
    await I.see(formattedDate);
    await I.see(soaConfig.servedParty);

    await I.see('Email notification details 2');
    await I.see('Local Authority');
    await I.see('test@gov.uk');
  },

  async performServiceOfApplication() {
    await this.selectEvent();
    await this.uploadDocumentsToBeServed();
    await this.serveOrderType();
    await this.submitOrderService();
    await this.verifyServiceOfApplicationSubmission();
  },

  async nonPersonalServiceOfApplication() {
    await this.uploadSpecialDocumentsToBeServed();
    await this.serveNonPersonalOrderType();
    await this.submitConfidentialService();
  },
  async confidentalityCheckOptionNo() {
    await this.noOptionConfidentialityCheck();
    await this.noConfirmationScreenAndVerification();
  },


  async confidentialConfirmationYes() {
    await this.uploadSpecialDocumentsToBeServed();
    await this.submitOrderService();
    await this.yesConfidentialityCheck();
    await this.yesConfirmationScreenAndVerification();
  }
};

