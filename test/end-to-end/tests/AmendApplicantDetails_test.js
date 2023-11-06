const testConfig = require('../config');

Feature('As a court admin Amend case details');
Scenario('Amend applicant information @nightly @wip', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.amendMiamDetails();
  await I.verifyUpdatedMiamDetails();
}).retry(testConfig.TestRetryScenarios);
