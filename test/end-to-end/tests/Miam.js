Feature('MIAM');

Scenario('MIAM - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.runMIAMEventHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });
