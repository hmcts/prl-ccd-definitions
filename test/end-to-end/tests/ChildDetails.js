Feature('Child Details');

Scenario('Child Details - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.childDetails();
}).retry({ retries: 3, minTimeout: 30000 });
