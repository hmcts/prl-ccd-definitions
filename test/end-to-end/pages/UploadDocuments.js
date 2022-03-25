const I = actor();

async function uploadDocuments() {
  await I.retry(3).triggerEvent('Upload documents');
  await I.retry(3).waitForPage('h1', 'Upload documents');

  await I.retry(3).addNewDocument('contactOrderDocumentsUploaded');
  await I.retry(3).addNewDocument('c8FormDocumentsUploaded');
  await I.retry(3).addNewDocument('otherDocumentsUploaded');

  await I.retry(3).wait('5');
  await I.retry(3).click('Continue');

  await I.retry(3).waitForText('Save and continue', '30');
  await I.retry(3).click('Save and continue');
  await I.retry(3).amOnHistoryPageWithSuccessNotification();
}

module.exports = { uploadDocuments };
