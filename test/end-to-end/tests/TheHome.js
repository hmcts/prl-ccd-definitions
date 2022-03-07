Feature('The Home');

Scenario('The Home - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.runTheHomeHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });
