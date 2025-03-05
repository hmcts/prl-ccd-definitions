const I = actor();
const retryCount = 3;

async function uploadDocuments() {
  await I.retry(retryCount).triggerEvent('Upload documents');
  await I.retry(retryCount).waitForPage('h1', 'Upload documents');
  await I.runAccessibilityTest();
  await I.retry(retryCount).addNewDocument('contactOrderDocumentsUploaded');
  await I.retry(retryCount).addNewDocument('c8FormDocumentsUploaded');
  await I.retry(retryCount).addNewDocument('otherDocumentsUploaded');

  await I.retry(retryCount).wait('5');
  await I.retry(retryCount).continueEvent();

  await I.retry(retryCount).waitForText('Save and continue', 'retryCount0');
  await I.retry(retryCount).click('Save and continue');
  await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
}

module.exports = { uploadDocuments };
