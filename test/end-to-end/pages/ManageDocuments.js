const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    typeOfDocument: 'select[id="mainApplicationDocument_0_typeOfDocumentFurtherEvidence"]'
  },

  async triggerEvent() {
    await I.retry(3).triggerEvent('Manage documents');
  },

  async mainApplicationDocuments() {
    const uploadTime = 5;
    await I.retry(3).waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue1');
    await I.retry(3).checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue1');
    await I.retry(3).click(this.fields.submit);

    await I.retry(3).waitForText('Further evidence - further application document');
    await I.retry(3).click('Add new');
    I.wait('1');
    await I.retry(3).waitForElement('#mainApplicationDocument_0_typeOfDocumentFurtherEvidence');
    await I.retry(3).selectOption(this.fields.typeOfDocument, 'Consent order');
    await I.retry(3).attachFile('#mainApplicationDocument_0_documentFurtherEvidence', '../resource/dummy.pdf');
    await I.retry(3).wait(uploadTime);
    await I.retry(3).checkOption('#mainApplicationDocument_0_restrictCheckboxFurtherEvidence-restrictToGroup');
    await I.retry(3).fillField('#giveDetails', 'Text Area');
    await I.retry(3).click(this.fields.submit);
  },

  async correspondence() {
    const uploadTime = 5;
    await I.retry(3).waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue2');
    await I.retry(3).checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue2');
    await I.retry(3).click(this.fields.submit);

    await I.retry(3).waitForText('Correspondence');
    await I.retry(3).click('Add new');
    I.wait('1');
    await I.retry(3).waitForElement('#correspondence_0_documentName');
    await I.retry(3).fillField('#correspondence_0_documentName', 'DocumentName');
    await I.retry(3).fillField('#correspondence_0_notes', 'Text Area');
    await I.retry(3).attachFile('#correspondence_0_documentCorrespondence', '../resource/dummy.pdf');
    await I.retry(3).wait(uploadTime);
    await I.retry(3).checkOption('#correspondence_0_restrictCheckboxCorrespondence-restrictToGroup');
    await I.retry(3).click(this.fields.submit);
  },

  async anyOtherDocument() {
    const uploadTime = 5;
    await I.retry(3).waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue3');
    await I.retry(3).checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue3');
    await I.retry(3).click(this.fields.submit);

    await I.retry(3).waitForText('Other documents');
    await I.retry(3).click('Add new');
    I.wait('1');
    await I.retry(3).waitForElement('#otherDocuments_0_documentName');
    await I.retry(3).fillField('#otherDocuments_0_documentName', 'DocumentName');
    await I.retry(3).fillField('#otherDocuments_0_notes', 'Text Area');
    await I.retry(3).attachFile('#otherDocuments_0_documentOther', '../resource/dummy.pdf');
    await I.retry(3).wait(uploadTime);
    await I.retry(3).checkOption('#otherDocuments_0_documentTypeOther-otherReports');
    await I.retry(3).checkOption('#otherDocuments_0_restrictCheckboxOtherDocuments-restrictToGroup');
    await I.retry(3).click(this.fields.submit);
  },

  async runManageDocumentsHappyPath() {
    await this.triggerEvent();
    await this.mainApplicationDocuments();
    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.correspondence();
    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.anyOtherDocument();
    await I.retry(3).submitEvent();
    await I.retry(3).amOnHistoryPageWithSuccessNotification();
  }
};