const I = actor();

async function uploadDocuments() {
  await I.triggerEvent('Upload documents');
  await I.waitForPage('h1', 'Upload documents');

  await I.addNewDocument('contactOrderDocumentsUploaded');
  await I.addNewDocument('c8FormDocumentsUploaded');
  await I.addNewDocument('otherDocumentsUploaded');

  await I.wait('5');
  await I.click('Continue');

  await I.waitForText('Submit', '30');
  await I.click('Submit');
  await I.amOnHistoryPageWithSuccessNotification();
}

module.exports = { uploadDocuments };
