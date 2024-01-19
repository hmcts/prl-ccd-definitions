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
    selectRestrictAccess: '#manageDocuments_0_isRestricted_Yes',
    documentReviewTab: '//div[contains(text(), "Documents to be reviewed")]',
    caseDocsTab: '//div[contains(text(), "Case documents")]',
    selectReviewDoc: '#reviewDocsDynamicList',
    restrictDocEle: '#reviewDecisionYesOrNo-yes',
    confidentialDetailsTab: '//div[contains(text(), "Confidential details")]',
    cfvTab: '//div[contains(text(), "Case File View")]',
    confFileEle: '//span[contains(text(), "dummy.pdf")]',
    noticeOfHearingFolderEle: '//*[@aria-level="2"]/button/span[contains(text(), "Notice of hearing")]',
    noticeOfHearingFileEle: '//*[@aria-level="3"]/button/span[contains(text(), "dummy.pdf")]',
    confidentialFolderFileEle: '//*[@aria-level="2"]/button/span[contains(text(), "dummy.pdf")]',
    nextBtnSelector: '.mat-tab-header-pagination-after  .mat-tab-header-pagination-chevron',
    documentRelatedToCase: '#manageDocuments_0_documentRelatedToCaseCheckbox',
    documentContainConfidential: '#manageDocuments_0_isConfidential_Yes',
    explainRestrictAccess: '#manageDocuments_0_restrictedDetails',

    // add new fields
    additionalRelatedToCase: '#manageDocuments_1_documentRelatedToCaseCheckbox',
    additionalSelectParty: '#manageDocuments_1_documentParty',
    additionalDocCategoryField: '#manageDocuments_1_documentCategories',
    additionalDocUploadField: '#manageDocuments_1_document',
    additionalDocDetailsField: '#manageDocuments_1_documentDetails',
    additionalDocConfidential: '#manageDocuments_1_isConfidential_Yes',
    additionalSelectRestrictAccess: '#manageDocuments_1_isRestricted_Yes',
    additionalExplainRestrictAccess: '#manageDocuments_1_restrictedDetails'
  },

  async triggerEvent() {
    await I.triggerEvent('Manage documents');
  },

  async confirmDocumentRelatedCase() {
    await I.waitForElement(this.fields.documentRelatedToCase);
    await I.click(this.fields.documentRelatedToCase);
  },

  async mainApplicationDocuments(documentCategory) {
    const uploadTime = 5;
    await I.waitForElement(this.fields.selectParty);
    await I.selectOption(this.fields.selectParty, manageDocConfig.partyType);
    await I.selectOption(this.fields.docCategoryField, documentCategory);
    await I.attachFile(this.fields.docUploadField, '../resource/dummy.pdf');
    await I.wait(uploadTime);
  },

  async mainCourtDocuments(documentCategory, documentDetails) {
    const uploadTime = 5;
    await I.waitForElement(this.fields.selectParty);
    await I.selectOption(this.fields.selectParty, manageDocConfig.courtPartyType);
    await I.selectOption(this.fields.docCategoryField, documentCategory);
    await I.attachFile(this.fields.docUploadField, '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.fillField(this.fields.docDetailsField, documentDetails);
  },
  
  async applyDocConfidential() {
    await I.click(this.fields.documentContainConfidential);
  },


  async applyRestrictAccess() {
    await I.click(this.fields.selectRestrictAccess);
    await I.fillField(this.fields.explainRestrictAccess, manageDocConfig.restrictAccessDetails)
  },

  async addAudioDocuments(documentCategory) {
    const uploadTime = 5;
    await I.waitForElement(this.fields.additionalSelectParty);
    await I.selectOption(this.fields.additionalSelectParty, manageDocConfig.partyType);
    await I.selectOption(this.fields.additionalDocCategoryField, documentCategory);
    await I.attachFile(this.fields.additionalDocUploadField, '../resource/test_av.mp3');
    await I.wait(uploadTime);
  },

  async additionalDocConfidential() {
    await I.click(this.fields.additionalDocConfidential);
  },

  async applyRestrictAccessForAudioDoc() {
    await I.click(this.fields.additionalSelectRestrictAccess);
    await I.fillField(this.fields.additionalExplainRestrictAccess, manageDocConfig.restrictAccessDetails)
  },

  async addNewDocuments() {
    await I.click('Add new');
    await I.waitForVisible(this.fields.additionalSelectParty);
  },

  async additionalConfirmDocRelated() {
    await I.click(this.fields.additionalRelatedToCase);
  },

  async submitDocuments() {
    await I.click(this.fields.submit);
    await I.waitForText(manageDocConfig.cyaText);
    await I.click(manageDocConfig.saveAndContinue);

    await I.waitForText(manageDocConfig.submissionText);
    await I.click(manageDocConfig.returnToCaseDetails);
  },

  async submitDocumentScreen() {
    await I.click(this.fields.submit);
  },

  async verifyDocumentSubmission() {
    // const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    await I.clickTillElementFound(this.fields.confidentialDetailsTab, this.fields.nextBtnSelector);
    await I.click(this.fields.confidentialDetailsTab);
    await I.see('Yes, restrict access.');
    await I.see(manageDocConfig.pdfFileName);
    await I.see(manageDocConfig.docCategory);
    await I.see(manageDocConfig.docDetailsText);
    await I.see(formattedDate);

    // verify audio file submission
    await I.see(manageDocConfig.audioFileName);
    await I.see('Court staff uploaded confidential documents 2');
  },

  async triggerReviewDocEventForFiles(fileName) {
    await I.triggerEvent('Review documents');
    await I.waitForText(manageDocConfig.reviewDocText);

    const option = await I.grabTextFrom('//select/option[2]');
    await I.selectOption(this.fields.selectReviewDoc, option);
    await I.click(this.fields.submit);
    await I.waitForText(manageDocConfig.docCategory);
    await I.waitForText(fileName);
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

    // verify audio files
    await I.see('Court staff uploaded confidential documents 2');
    await I.see(manageDocConfig.audioFileName);
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
    await I.click('Notice of hearing');
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
    await this.confirmDocumentRelatedCase();
    await this.mainApplicationDocuments(manageDocConfig.docCategory, manageDocConfig.docDetailsText);
    await this.applyDocConfidential();
    await this.applyRestrictAccess();

    await this.addNewDocuments();
    await this.additionalConfirmDocRelated();
    await this.addAudioDocuments(manageDocConfig.docCategory, manageDocConfig.docDetailsText);
    await this.additionalDocConfidential();
    await this.applyRestrictAccessForAudioDoc();

    await this.submitDocuments();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.verifyDocumentSubmission();
  },

  async reviewDocuments() {
    await this.triggerReviewDocEventForFiles(manageDocConfig.pdfFileName);
    await I.amOnHistoryPageWithSuccessNotification();
    await this.triggerReviewDocEventForFiles(manageDocConfig.audioFileName);
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

  async addNonRestrictedCourtDocuments() {
    await this.triggerEvent();
    await this.mainCourtDocuments(manageDocConfig.nonRestDocCategory, manageDocConfig.nonRestrictedDocDetailsText);
    await this.submitDocumentScreen();
  },

  async verifyErrorMessageOnDocScreen() {
    await I.see(manageDocConfig.errMsg);
  },

  async verifyCaseFileViewOfAdminRestDoc() {
    await I.clickTillElementFound(this.fields.cfvTab, this.fields.nextBtnSelector);
    await I.click(this.fields.cfvTab);
    await I.waitForText('Confidential');
    await I.click('Confidential');
    await I.seeElement(this.fields.confidentialFolderFileEle);
  },

  async nonRestReviewDocuments() {
    await this.verifyCaseFileViewOfNonRestDoc();
  }
};