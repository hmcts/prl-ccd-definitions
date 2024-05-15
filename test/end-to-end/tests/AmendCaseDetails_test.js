const testConfig = require('../config');

Feature('As a court admin Amend case details');

Scenario('Amend applicant information @regression-suite', async({ I }) => {
  await I.loginAsOldCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.amendMiamDetails();
  await I.verifyUpdatedMiamDetails();
}).retry(testConfig.TestRetryScenarios);


Scenario('DA - Amend respondent information', async({ I }) => {
  await I.loginAsOldCourtAdmin();
  await I.createFL401CaseByCourtAdmin();
  await I.amendDARespondentDetails();
  await I.verifyUpdatedRespondentDetails();
}).retry(testConfig.TestRetryScenarios);