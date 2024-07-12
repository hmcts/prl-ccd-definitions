const I = actor();
const retryCount = 3;

async function uploadFLDocuments() {
  await I.retry(retryCount).triggerEvent('Upload documents');
  await I.retry(retryCount).waitForPage('h1', 'Upload documents');
  await I.runAccessibilityTest();
  await I.retry(retryCount).addNewDocument('fl401UploadWitnessDocuments');

  await I.retry(retryCount).wait('5');
  await I.runAccessibilityTest();
  await I.retry(retryCount).continueEvent();

  await I.retry(retryCount).waitForText('Save and continue', '5');
  await I.retry(retryCount).click('Save and continue');
  await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
}

module.exports = { uploadFLDocuments };
