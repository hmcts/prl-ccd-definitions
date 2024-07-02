const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Court Admin Create Dummy case - Create Order & send message journeys');
Scenario('Create Order C21 @regression-suite', async({ I }) => {
  await I.loginAsOldCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  caseId = await I.saveTheCaseIdAndSignInAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.manageOrderCreateOrderC21();
  await I.fillHearingDetails();
  await I.submitManageOrder();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a court admin Create Order C43 @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.manageOrderCreateOrderC43();
}).retry(testConfig.TestRetryScenarios);


caseId = '1717587983937085';
Scenario('As a Judge edit & draft C43 order @regression-suite', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.editAnDraftOrderCreatedByAdmin();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin edit & serve an order @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.adminServeAnOrder();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Send an Internal message to Judge - These are still under MVP and tests will be changing', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.sendAMessage();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Judge reply to the Internal message sent by Admin - These are still under MVP and tests will be changing', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.reviewTheMessage();
  await I.replyToMessageAsJudge();
}).retry(testConfig.TestRetryScenarios);