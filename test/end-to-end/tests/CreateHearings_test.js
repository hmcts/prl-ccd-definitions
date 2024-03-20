const testConfig = require('../config');

Feature('Create, update & Cancel hearings for a case');
Scenario('Create, update & Cancel manual hearing for a case @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.requestANewHearing();
  await I.updateAHearing();
  await I.cancelHearing();
}).retry(testConfig.TestRetryScenarios);
