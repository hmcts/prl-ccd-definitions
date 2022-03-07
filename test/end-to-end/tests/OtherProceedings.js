Feature('Other proceedings');

Scenario('Other proceedings event for C100 Casetype', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.otherProceedingsEventC100();
}).retry({ retries: 3, minTimeout: 30000 });

Scenario('Other proceedings event for FL401 Casetype', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.otherProceedingsEventFL401();
}).retry({ retries: 3, minTimeout: 30000 });
