const testConfig = require('../config');

Feature('Help with Fee in AWP - TS Solicitor application');
Scenario('Solicitor Help With Fee in AWP @to-fix', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createCase_TS();
  await I.runSubmitAndPayHappyPath();
  await I.awpCAOtherOrders();
}).retry(testConfig.TestRetryScenarios);