Feature('Going to court');

Scenario('Going to court event - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.runGoingToCourtEvent();
}).retry({ retries: 3, minTimeout: 30000 });
