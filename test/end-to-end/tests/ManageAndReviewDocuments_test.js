const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;
let secondCaseId;

Feature('Court Admin - Manage and review documents');
Scenario('As a court admin I want to manage and review restricted docs @regression-suite', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  caseId = await I.saveTheCaseId();
  await I.searchForCasesWithId(caseId);
  await I.performManageDocuments();
  await I.reviewCAManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin I want to manage and review Confidential docs @regression-suite', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.performManageDocumentsForConfidentialFiles();
  await I.reviewConfidentialManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin I want to manage and review non restricted docs @regression-suite', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.performNonRestrictedManageDocuments();
  await I.reviewNonRestManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Solicitor I should not be able to upload court documents @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  await I.uploadCourtDocument();
  await I.verifySolicitorDocumentSubmission();
}).retry(testConfig.TestRetryScenarios);

Scenario('Verify WA task generated for Court admin to review the documents @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  secondCaseId = await I.saveTheCaseId();
  await I.searchForCasesWithId(secondCaseId);
  await I.performManageDocumentsAsaSolicitor();

  // Logs in as court admin
  await I.saveTheCaseIdAndSignout();
  await I.searchForCasesWithId(secondCaseId);
  await I.reviewDocumentsCreatedViaTask();
}).retry(testConfig.TestRetryScenarios);
