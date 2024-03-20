const testConfig = require('../config');

Feature('Create, update & Cancel hearings for a case');
Scenario('Create, update & Cancel manual hearing for a case @regression-suite', async({ I }) => {
  await I.loginAsOldCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  caseId = await I.saveTheCaseIdAndSignInAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);

  await I.requestANewHearing();
  await I.updateAHearing();
  await I.cancelHearing();
}).retry(testConfig.TestRetryScenarios);
