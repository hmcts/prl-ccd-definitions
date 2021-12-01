Feature('Welsh language requirements');

Scenario('Welsh language requirements event', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.welshLanguageRequirement();
}).retry({ retries: 3, minTimeout: 30000 });
