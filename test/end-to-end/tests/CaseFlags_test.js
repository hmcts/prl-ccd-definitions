const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Court Admin - Review Solicitor support request for hearings');

Scenario('As a solicitor raise an RA flag @ithc-tests', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  caseId = await I.saveTheCaseId();
  await I.requestSupportForHearing();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin - approve & non-approve the requested flag support @ithc-tests', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.reviewSupportForHearingRequest();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin - Add a Non-RA & RA flags @ithc-tests', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.addCAFlags();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Solicitor - I should only see RA flags @ithc-tests', async({ I }) => {
    await I.loginAsSolicitor();
    await I.searchForCasesWithId(caseId);
    await I.reviewCAAddedFlags();
  }).retry(testConfig.TestRetryScenarios);
  