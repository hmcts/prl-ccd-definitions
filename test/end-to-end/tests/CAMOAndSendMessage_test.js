const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Court Admin Create Dummy case - Create Order & send message journeys');
Scenario('Create Order C21 @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.manageOrderCreateOrderC21();
  await I.fillHearingDetails();
  await I.submitManageOrder();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a court admin Create Order C43 @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  caseId = await I.saveTheCaseId();
  await I.searchForCasesWithId(caseId);
  await I.manageOrderCreateOrderC43();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a Judge edit & draft C43 order @nightly', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.editAnDraftOrderCreatedByAdmin();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin edit & serve an order @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.adminServeAnOrder();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Send an Internal message to Judge @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.sendAMessage();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Judge reply to the Internal message sent by Admin @nightly', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.reviewTheMessage();
  await I.replyToMessageAsJudge();
}).retry(testConfig.TestRetryScenarios);