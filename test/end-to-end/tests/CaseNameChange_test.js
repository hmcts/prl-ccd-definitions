const testConfig = require('../config');

Feature('Case Name Change');
Scenario('Case Name - basic journey @regression-suite @cross-browser', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.caseNameChange();
}).retry(testConfig.TestRetryScenarios);
