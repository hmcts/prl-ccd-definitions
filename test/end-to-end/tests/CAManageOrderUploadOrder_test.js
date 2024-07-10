const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;


Feature('CA Manage Order Upload Order - TS Court Admin');
Scenario(
  'CA Manage Order Upload Order Serve order Personally @regression-suitec',
  async({ I }) => {
    await I.loginAsOldCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    caseId = await I.saveTheCaseIdAndSignInAsSwanseaCourtAdmin();
    await I.searchForCasesWithId(caseId);
    await I.manageOrderUploadOrderServeNowPersonally();
  }).retry(testConfig.TestRetryScenarios);

Scenario(
  'CA Manage Order Upload Order - For Judge review - @regression-suite',
  async({ I }) => {
    await I.loginAsSwanseaCourtAdmin();
    await I.searchForCasesWithId(caseId);
    await I.manageOrderUploadOrderForJudgeReview();
  }).retry(testConfig.TestRetryScenarios);


Scenario('As a court admin Create Order C43 @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.createOrderC43AndSendToCaseManager();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Case manager edit & approve a draft order @to-fix', async({ I }) => {
  await I.loginAsCaseManager();
  await I.searchForCasesWithId(caseId);
  await I.editDratOrderAsManager();
}).retry(testConfig.TestRetryScenarios);
