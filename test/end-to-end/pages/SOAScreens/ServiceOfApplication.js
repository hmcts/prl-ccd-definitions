'use strict';
const I = actor();
const retryCount = 3;
const medWait = 10;

const soaConfig = require('./soaConfig');

const date = new Date();

module.exports = {
  fields: {
    proceedToServing: '#proceedToServing_Yes',
    selectOrder: '[field_id=\'serviceOfApplicationScreen1\']',
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
    tasksTab: '//div[contains(text(), \'Tasks\')]',
    previousBtnSelector: '.mat-ripple.mat-tab-header-pagination.mat-tab-header-pagination-before.mat-elevation-z4',
    applicationSoSDueAssignTaskToMe: '//exui-case-task/p/strong[contains(text(), "Application statement of service due")]/../../dl/div[4]//dd/a',
    waitingForSolicitorSoSText: 'Waiting for Applicant\'s Solicitor to upload Statement of Service',
    continueButton: '//button[contains(text(), "Continue")]',
    saveAndContinueButton: '//button[contains(text(), "Save and continue")]'


  },

  async selectEvent() {
    await I.triggerEvent(soaConfig.soaEvent);
  },

  async uploadDocumentsToBeServed() {
    await I.waitForText(soaConfig.documentSelectionText);
    await I.click(this.fields.selectOrder);
    await I.see(soaConfig.c43AOrderText);
    await I.wait('7');
    await I.attachFile(this.fields.p63FileUpload, '../resource/dummy.pdf');
    await I.attachFile(this.fields.specialArrangementsUpload, '../resource/dummy.pdf');
    await I.wait('3');
    await I.click(soaConfig.continueText);
  },

  async serveOrderType() {
    // await I.waitForText(soaConfig.serveType);
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
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.clickTillElementFound(this.fields.soaTab, this.fields.nextBtnSelector);
    await I.click(this.fields.soaTab);

    await I.waitForText(soaConfig.notificationText);
    await I.click(this.fields.expandEle);
    await I.waitForText('Applicant solicitor');
    await I.waitForText('By email');
    // await I.seeInField(this.fields.docAttachedField, soaConfig.docsAttached);
    await I.see('C100FinalDocument.pdf');
    await I.see('C1A_Document.pdf');
    await I.see('cover_letter_re6.pdf');
    await I.see('Privacy_Notice.pdf');
    await I.see('Family Presidents letter to parties.pdf');
    await I.see('Blank_C7.pdf');
    await I.see('C9_personal_service.pdf');
    await I.see('C1A_Blank.pdf');
    await I.see(soaConfig.recpEmail);
    await I.see(formattedDate);
    await I.see(soaConfig.servedParty);

    await I.see('Email notification details 2');
    await I.see('Local Authority');
    await I.see('test@gov.uk');
  },

  async performCitizenServingSOA() {
    await this.selectEvent();
    await I.waitForText('Select and upload orders and documents to be served');
    // await I.attachFile(this.fields.p63FileUpload, '../resource/dummy.pdf');
    await I.attachFile(this.fields.specialArrangementsUpload, '../resource/dummy.pdf');
    await I.wait('5');

    await I.click(this.fields.continueButton);

    await I.waitForText('Does this application need to be personally served on the respondent?');
    await I.checkOption('#soaServeToRespondentOptions_No');
    await I.waitForElement('//*[contains(text(),"Applicant 1")]/../ancestor::label/../input');
    await I.click('//*[contains(text(),"Applicant 1")]/../ancestor::label/../input');
    await I.click('//*[contains(text(),"Respondent 1")]/../ancestor::label/../input');
    await I.checkOption('#soaCafcassCymruServedOptions_Yes');
    await I.fillField('#soaCafcassCymruEmail', 'test@testcafcass.com');

    await I.checkOption('#soaServeLocalAuthorityYesOrNo_Yes');
    await I.waitForElement('//*[@field_id = "soaLaEmailAddress"]//input');
    await I.fillField('//*[@field_id = "soaLaEmailAddress"]//input', 'testLA@test.com');
    const option = await I.grabTextFrom('//select[@id="soaDocumentDynamicListForLa_0_documentsListForLa"]/option[3]');
    await I.selectOption(this.fields.selectDocument, option);
    await I.click(this.fields.continueButton);


    await I.waitForText('Check your answers');
    await I.click(this.fields.saveAndContinueButton);
  },
  async performServiceOfApplication() {
    await this.selectEvent();
    await this.uploadDocumentsToBeServed();
    await this.serveOrderType();
    await this.submitOrderService();
  },
  async verifyPostConfidentialityCheck_Yes() {
    await I.wait(medWait);
    await I.click(this.fields.tasksTab);
    await I.wait(medWait);
    await I.reloadPage(this.fields.applicationSoSDueAssignTaskToMe);
    await I.waitForElement(this.fields.applicationSoSDueAssignTaskToMe);
    await I.retry(retryCount).click(this.fields.applicationSoSDueAssignTaskToMe);
    await I.waitForText(this.fields.waitingForSolicitorSoSText);
    await this.verifyServiceOfApplicationSubmission();
  }
};