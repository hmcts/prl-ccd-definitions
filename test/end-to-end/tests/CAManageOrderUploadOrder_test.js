const testConfig = require('../config');

Feature('CA Manage Order Upload Order - TS Court Admin');
Scenario(
  'CA Manage Order Upload Order Serve order Personally @nightly',
  async({ I }) => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    await I.manageOrderUploadOrderServeNowPersonally();
  }).retry(testConfig.TestRetryScenarios);

Scenario(
  'CA Manage Order Upload Order - For Judge review - @nightly',
  async({ I }) => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    await I.manageOrderUploadOrderForJudgeReview();
  }).retry(testConfig.TestRetryScenarios);


  Scenario('As a court admin Create Order C43 @nightly', async({ I }) => {
    await I.loginAsCourtAdmin();
    await I.createC100CaseByCourtAdmin();
    caseId = await I.saveTheCaseId();
    await I.searchForCasesWithId(caseId);
    await I.createOrderC43AndSendToCaseManager();
  }).retry(testConfig.TestRetryScenarios);

  Scenario('As a Case manager edit & approve a draft order @nightly', async({ I }) => {
    await I.loginAsCaseManager();
    await I.searchForCasesWithId(caseId);
    await I.editDratOrderAsManager();
  }).retry(testConfig.TestRetryScenarios);
  
