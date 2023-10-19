const testConfig = require('../config');

Feature('Create & Cancel hearings for a case');
Scenario('Create & Cancel manual hearing for a case @nightly', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.requestANewHearing();
  await I.cancelHearing();
}).retry(testConfig.TestRetryScenarios);
