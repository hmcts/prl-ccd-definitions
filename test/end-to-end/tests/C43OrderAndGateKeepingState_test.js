/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
/* eslint init-declarations: ["error", "never"]*/

let caseId;

Feature('Solicitor - Manage order, Gatekeeping & Service of application tests ');

Scenario('Draft an Solicitor Order & Move case to Gatekeeping State @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  await I.draftAnOrder();
  caseId = await I.saveTheCaseIdAndSignInAsStokeCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.issueCase();
  await I.saveTheCaseIdAndSignInAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.moveCaseToGateKeeping();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a Judge edit & change a draft order @regression-suite ', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.editAnDraftOrderCreatedBySolicitor();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a court admin edit & serve an order @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.serveAnOrder();
  await I.performServiceOfApplication();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Case Manager Confidentiality Check @regression-suite ', async({ I }) => {
  await I.loginAsCaseManager();
  await I.searchForCasesWithId(caseId);
  await I.caseManagerConfidentialityCheck();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Verify SOA and Task tab after Confidentiality check @regression-suite ', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.verifyPostConfidentialityCheck_Yes();
}).retry(testConfig.TestRetryScenarios);

Scenario('As an Applicant Solicitor execute Statement of service @regression-suite ', async({ I }) => {
  await I.loginAsSolicitor();
  await I.searchForCasesWithId(caseId);
  await I.completeStatementOfService();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Verify Statement of service in SOA tab @regression-suite ', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.verifyPostStatementOfService();
}).retry(testConfig.TestRetryScenarios);


Scenario('Solicitor - Notice of change journey test ', async({ I }) => {
  await I.loginAsRespondentSolicitor();
  await I.submitAndVerifyNOCForCaseWithId(caseId);
}).retry(testConfig.TestRetryScenarios);
