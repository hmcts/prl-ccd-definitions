const testConfig = require('../config');

Feature('Help with Fee - Solicitor - CA Submit and Pay - TS');
Scenario(
  'Solicitor Help With Fee - No option- Create CA Submit and Pay-TS @nightly',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.runSubmitAndPayHappyPath();
  }
).retry(testConfig.TestRetryScenarios);
