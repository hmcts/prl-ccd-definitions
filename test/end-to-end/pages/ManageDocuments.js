const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    typeOfDocument: 'select[id="mainApplicationDocument_0_typeOfDocumentFurtherEvidence"]'
  },

  async triggerEvent() {
    await I.triggerEvent('Manage Documents');
  },

  async mainApplicationDocuments() {
    const uploadTime = 5;
    await I.waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue1');
    await I.checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue1');
    await I.click(this.fields.submit);

    await I.waitForText('Further evidence - further application document');
    await I.click('Add new');
    I.wait('1');
    await I.waitForElement('#mainApplicationDocument_0_typeOfDocumentFurtherEvidence');
    await I.selectOption(this.fields.typeOfDocument, 'Consent order');
    await I.attachFile('#mainApplicationDocument_0_documentFurtherEvidence', '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.checkOption('#mainApplicationDocument_0_restrictCheckboxFurtherEvidence-restrictToGroup');
    await I.fillField('#giveDetails', 'Text Area');
    await I.click(this.fields.submit);
  },

  async correspondence() {
    const uploadTime = 5;
    await I.waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue2');
    await I.checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue2');
    await I.click(this.fields.submit);

    await I.waitForText('Correspondence');
    await I.click('Add new');
    I.wait('1');
    await I.waitForElement('#correspondence_0_documentName');
    await I.fillField('#correspondence_0_documentName', 'DocumentName');
    await I.fillField('#correspondence_0_notes', 'Text Area');
    await I.attachFile('#correspondence_0_documentCorrespondence', '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.checkOption('#correspondence_0_restrictCheckboxCorrespondence-restrictToGroup');
    await I.click(this.fields.submit);
  },

  async anyOtherDocument() {
    const uploadTime = 5;
    await I.waitForElement('#documentCategoryChecklist-documentCategoryChecklistEnumValue3');
    await I.checkOption('#documentCategoryChecklist-documentCategoryChecklistEnumValue3');
    await I.click(this.fields.submit);

    await I.waitForText('Other documents');
    await I.click('Add new');
    I.wait('1');
    await I.waitForElement('#otherDocuments_0_documentName');
    await I.fillField('#otherDocuments_0_documentName', 'DocumentName');
    await I.fillField('#otherDocuments_0_notes', 'Text Area');
    await I.attachFile('#otherDocuments_0_documentOther', '../resource/dummy.pdf');
    await I.wait(uploadTime);
    await I.checkOption('#otherDocuments_0_documentTypeOther-otherReports');
    await I.checkOption('#otherDocuments_0_restrictCheckboxOtherDocuments-restrictToGroup');
    await I.click(this.fields.submit);
  },

  async runManageDocumentsHappyPath() {
    await this.triggerEvent();
    await this.mainApplicationDocuments();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.correspondence();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
    await this.triggerEvent();
    await this.anyOtherDocument();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};