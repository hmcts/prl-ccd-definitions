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
  await I.reviewCAManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin I want to manage and review Confidential docs @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.performManageDocumentsForConfidentialFiles();
  await I.reviewConfidentialManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin I want to manage and review non restricted docs @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.performNonRestrictedManageDocuments();
  await I.reviewNonRestManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Solicitor I should not be able to upload court documents @nightly', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  await I.uploadCourtDocument();
  await I.verifySolicitorDocumentSubmission();
}).retry(testConfig.TestRetryScenarios);
