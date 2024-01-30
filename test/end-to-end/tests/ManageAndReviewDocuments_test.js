const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Court Admin - Manage and review documents');
Scenario('As a court admin I want to manage and review restricted docs @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  caseId = await I.saveTheCaseId();
  await I.searchForCasesWithId(caseId);
  await I.performManageDocuments();
  await I.reviewManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin I want to manage and review non restricted docs @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.performNonRestrictedManageDocuments();
  await I.reviewNonRestManageDocuments();
}).retry(testConfig.TestRetryScenarios);
