const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    typeOfDocument: 'select[id="mainApplicationDocument_0_typeOfDocumentFurtherEvidence"]'
  },

  async triggerEvent() {
    await I.retry(retryCount).triggerEvent('Manage documents');
  },

  async mainApplicationDocuments() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue1');
    await I.retry(retryCount).checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue1');
    await I.retry(retryCount).click(this.fields.submit);

    await I.retry(retryCount).waitForText('Further evidence - further application document');
    await I.retry(retryCount).click('Add new');
    I.wait('1');
    await I.retry(retryCount).waitForElement('#mainApplicationDocument_0_typeOfDocumentFurtherEvidence');
    await I.retry(retryCount).selectOption(this.fields.typeOfDocument, 'Consent order');
    await I.retry(retryCount).attachFile('#mainApplicationDocument_0_documentFurtherEvidence', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).checkOption('#mainApplicationDocument_0_restrictCheckboxFurtherEvidence-restrictToGroup');
    await I.retry(retryCount).fillField('#giveDetails', 'Text Area');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async correspondence() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue2');
    await I.retry(retryCount).checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue2');
    await I.retry(retryCount).click(this.fields.submit);

    await I.retry(retryCount).waitForText('Correspondence');
    await I.retry(retryCount).click('Add new');
    I.wait('1');
    await I.retry(retryCount).waitForElement('#correspondence_0_documentName');
    await I.retry(retryCount).fillField('#correspondence_0_documentName', 'DocumentName');
    await I.retry(retryCount).fillField('#correspondence_0_notes', 'Text Area');
    await I.retry(retryCount).attachFile('#correspondence_0_documentCorrespondence', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).checkOption('#correspondence_0_restrictCheckboxCorrespondence-restrictToGroup');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async anyOtherDocument() {
    const uploadTime = 5;
    await I.retry(retryCount).waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue3');
    await I.retry(retryCount).checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue3');
    await I.retry(retryCount).click(this.fields.submit);

    await I.retry(retryCount).waitForText('Other documents');
    await I.retry(retryCount).click('Add new');
    I.wait('1');
    await I.retry(retryCount).waitForElement('#otherDocuments_0_documentName');
    await I.retry(retryCount).fillField('#otherDocuments_0_documentName', 'DocumentName');
    await I.retry(retryCount).fillField('#otherDocuments_0_notes', 'Text Area');
    await I.retry(retryCount).attachFile('#otherDocuments_0_documentOther', '../resource/dummy.pdf');
    await I.retry(retryCount).wait(uploadTime);
    await I.retry(retryCount).checkOption('#otherDocuments_0_documentTypeOther-otherReports');
    await I.retry(retryCount).checkOption('#otherDocuments_0_restrictCheckboxOtherDocuments-restrictToGroup');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runManageDocumentsHappyPath() {
    await this.triggerEvent();
    await this.mainApplicationDocuments();
    await I.retry(retryCount).submitEvent();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.correspondence();
    await I.retry(retryCount).submitEvent();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.anyOtherDocument();
    await I.retry(retryCount).submitEvent();
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  }
};