const testConfig = require('../config');

Feature('Withdraw application as a Solicitor');

Scenario('Withdraw application as Solicitor @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  await I.solicitorWithdrawApplication();
}).retry(testConfig.TestRetryScenarios);