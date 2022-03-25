Feature('Manage Documents');

Scenario('Manage Documents - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.runManageDocuments();
}).retry({ retries: 3, minTimeout: 30000 });
