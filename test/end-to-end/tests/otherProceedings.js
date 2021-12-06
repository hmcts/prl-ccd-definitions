Feature('Other proceedings');

Scenario('Other proceedings  event', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.otherProceedingsEvent();
}).retry({ retries: 3, minTimeout: 30000 });
