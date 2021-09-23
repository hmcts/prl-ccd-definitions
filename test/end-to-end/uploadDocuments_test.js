Feature('Upload documents');

Scenario('Upload documents event', I => {
  I.loginAsSolicitor();
  I.createCase();
  I.uploadDocuments();
}).retry({ retries: 3, minTimeout: 30000 });
