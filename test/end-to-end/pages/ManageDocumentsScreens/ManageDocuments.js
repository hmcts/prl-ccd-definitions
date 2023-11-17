'use strict';
const I = actor();

const manageDocConfig = require('./manageDocConfig');

const date = new Date();
const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    typeOfDocument: 'select[id="mainApplicationDocument_0_typeOfDocumentFurtherEvidence"]',
    selectParty: '#manageDocuments_0_documentParty',
    docCategoryField: '#manageDocuments_0_documentCategories',
    docUploadField: '#manageDocuments_0_document',
    docDetailsField: '#manageDocuments_0_documentDetails',
    selectRestrictAccess: '#manageDocuments_0_documentRestrictCheckbox-restrictToGroup',
    documentReviewTab: '//div[contains(text(), "Documents to be reviewed")]',
    caseDocsTab: '//div[contains(text(), "Case documents")]',
    selectReviewDoc: '#reviewDocsDynamicList',
    restrictDocEle: '#reviewDecisionYesOrNo-yes',
    confidentialDetailsTab: '//div[contains(text(), "Confidential details")]',
    cfvTab: '//div[contains(text(), "Case File View")]',
    confFileEle: '//span[contains(text(), "dummy.pdf")]',
    noticeOfHearingFolderEle: '//*[@aria-level="2"]/button/span[contains(text(), "Notice of Hearing")]',
    noticeOfHearingFileEle: '//*[@aria-level="3"]/button/span[contains(text(), "dummy.pdf")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron'
  },

  async triggerEvent() {
    await I.triggerEvent('Manage documents');
  },

  async mainApplicationDocuments(documentCategory, documentDetails) {
    const uploadTime = 5;
    await I.waitForElement(this.fields.selectParty);
    await I.selectOption(this.fields.selectParty, manageDocConfig.partyType);
    await I.selectOption(this.fields.docCategoryField, documentCategory);
    await I.attachFile(this.fields.docUploadField, '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.fillField(this.fields.docDetailsField, documentDetails);
  },

  async applyRestrictAccess() {
    await I.click(this.fields.selectRestrictAccess);
  },

  async submitDocuments() {
    await I.click(this.fields.submit);
    await I.waitForText(manageDocConfig.cyaText);
    await I.click(manageDocConfig.saveAndContinue);

    await I.waitForText(manageDocConfig.submissionText);
    await I.click(manageDocConfig.returnToCaseDetails);
  },

  async verifyDocumentSubmission() {
    // const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.click(this.fields.documentReviewTab);
    await I.see('Yes, restrict access.');
    await I.see(manageDocConfig.docCategory);
    await I.see(manageDocConfig.docDetailsText);
    await I.see(formattedDate);
  },

  async triggerReviewDocEvent() {
    await I.triggerEvent('Review documents');
    await I.waitForText(manageDocConfig.reviewDocText);

    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectReviewDoc, option);
    await I.click(this.fields.submit);
    await I.waitForText(manageDocConfig.docCategory);
    await I.click(this.fields.restrictDocEle);
    await I.click(this.fields.submit);

    await I.waitForText(manageDocConfig.cyaText);
    await I.click(this.fields.submit);

    await I.waitForText(manageDocConfig.reviewSubmissionText);
    await I.click(manageDocConfig.returnToCaseDetails);
  },

  async verifyReviewDocSubmission() {
    await I.dontSeeElement(this.fields.documentReviewTab);
    await I.clickTillElementFound(this.fields.confidentialDetailsTab, this.fields.nextBtnSelector);
    await I.click(this.fields.confidentialDetailsTab);
    await I.see(manageDocConfig.confDetailText);
    await I.see(manageDocConfig.docCategory);
    await I.see(manageDocConfig.docDetailsText);
    await I.see(manageDocConfig.partyType);
    await I.see(formattedDate);
  },

  async verifyCaseFileView() {
    await I.clickTillElementFound(this.fields.cfvTab, this.fields.nextBtnSelector);
    await I.click(this.fields.cfvTab);
    await I.waitForText(manageDocConfig.confidentialLabel);
    await I.click(manageDocConfig.confidentialLabel);
    await I.seeElement(this.fields.confFileEle);
  },

  async verifyCaseFileViewOfNonRestDoc() {
    await I.clickTillElementFound(this.fields.cfvTab, this.fields.nextBtnSelector);
    await I.click(this.fields.cfvTab);
    await I.waitForText('Attending the Hearing');
    await I.click('Attending the Hearing');
    await I.seeElement(this.fields.noticeOfHearingFolderEle);
    await I.click('Notice of Hearing');
    await I.seeElement(this.fields.noticeOfHearingFileEle);
  },

  async verifyNonRestrictedDocumentSubmission() {
    await I.click(this.fields.caseDocsTab);
    await I.see(manageDocConfig.nonRestDocCategory);
    await I.see(manageDocConfig.nonRestrictedDocDetailsText);
    await I.see(formattedDate);
  },

  async runManageDocumentsHappyPath() {
    await this.triggerEvent();
    await this.mainApplicationDocuments(manageDocConfig.docCategory, manageDocConfig.docDetailsText);
    await this.applyRestrictAccess();
    await this.submitDocuments();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifyDocumentSubmission();
  },

  async reviewDocuments() {
    await this.triggerReviewDocEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifyReviewDocSubmission();
    await this.verifyCaseFileView();
  },

  async addNonRestrictedDocuments() {
    await this.triggerEvent();
    await this.mainApplicationDocuments(manageDocConfig.nonRestDocCategory, manageDocConfig.nonRestrictedDocDetailsText);
    await this.submitDocuments();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifyNonRestrictedDocumentSubmission();
  },

  async nonRestReviewDocuments() {
    await this.verifyCaseFileViewOfNonRestDoc();
  }
};