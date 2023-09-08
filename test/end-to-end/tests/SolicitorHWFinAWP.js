Feature('Help with Fee in AWP - TS Solicitor application');

Scenario('Solicitor Help With Fee in AWP @nightly', async I => {
  await I.loginAsSolicitor();
  await I.createCase_TS();
  await I.runSubmitAndPayHappyPath();
}).retry({ retries: 3, minTimeout: 30000 });