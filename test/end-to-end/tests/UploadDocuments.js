Feature('Upload documents');

Scenario('Upload documents event', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.uploadDocuments();
}).retry({ retries: 3, minTimeout: 30000 });
