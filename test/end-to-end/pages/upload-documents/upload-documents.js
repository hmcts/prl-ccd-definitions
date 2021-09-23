/* eslint-disable no-invalid-this, require-await */

function addNewDocument(field) {
  const I = this;
  I.click('Add new', { css: `#${field}>div>button` });
  I.attachFile(`input[id="${field}_value"]`, '../resource/dummy.pdf');
}

async function uploadDocuments() {
  const I = this;
  I.selectOption('select[id="next-step"]', 'Upload documents');
  I.click('Go');
  I.waitForPage('h1', 'Upload documents');

  I.addNewDocument('ContactOrderDocumentsUploaded');
  I.addNewDocument('C8FormDocumentsUploaded');
  I.addNewDocument('OtherDocumentsUploaded');

  I.wait('5');
  I.click('Continue');

  I.waitForText('Submit', '30');
  I.click('Submit');
}

module.exports = { addNewDocument, uploadDocuments };
