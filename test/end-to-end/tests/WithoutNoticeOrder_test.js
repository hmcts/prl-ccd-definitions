Feature('Without Notice Order');

Scenario('Create a DA case without Notice Order', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.runWithoutNoticeOrderHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });
