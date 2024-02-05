const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Solicitor - Manage order, Gatekeeping & Service of application tests');

Scenario('Draft an Solicitor Order & Move case to Gatekeeping State @nightly', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  await I.draftAnOrder();
  caseId = await I.saveTheCaseIdAndSignout();
  await I.searchForCasesWithId(caseId);
  await I.issueCase();
  await I.moveCaseToGateKeeping();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Judge edit & change a draft order @nightly', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.editAnDraftOrderCreatedBySolicitor();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin edit & serve an order @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.serveAnOrder();
  await I.performServiceOfApplication();
}).retry(testConfig.TestRetryScenarios);

Scenario('Solicitor - Notice of change journey test @nightly', async({ I }) => {
  await I.loginAsRespondentSolicitor();
  await I.submitAndVerifyNOCForCaseWithId(caseId);
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Case Manager - confidentiality check event @nightly', async({ I }) => {
  await I.loginAsCaseManager();
  await I.createC100CaseByCourtAdmin();
  await I.confidentialServiceOfApplication();
  await I.confidentialCaseManager();
}).retry(testConfig.TestRetryScenarios);

