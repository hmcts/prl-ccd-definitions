const testConfig = require('../config');

Feature('Create hearings for a case');
Scenario('Create manual hearing for a case @wip', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.createFLCaseByCourtAdmin();
//   await I.manageOrderCreateOrderC21();
//   await I.fillHearingDetails();
//   await I.submitManageOrder();
}).retry(testConfig.TestRetryScenarios);
