const testConfig = require('../config');

Feature('Court Admin Create Dummy case - Create Order C21');
Scenario('Create Order C21 @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.manageOrderCreateOrderC21();
  await I.fillHearingDetails();
  await I.submitManageOrder();
}).retry(testConfig.TestRetryScenarios);
