const testConfig = require('../config');

Feature('Move case to Gatekeeping State');
Scenario('Move case to Gatekeeping State @nightly', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  const caseId = await I.saveTheCaseIdAndSignout();
  await I.searchForCasesWithId(caseId);
  await I.issueCase();
  await I.moveCaseToGateKeeping();
}).retry(testConfig.TestRetryScenarios);