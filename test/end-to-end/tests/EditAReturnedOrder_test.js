const testConfig = require('../config');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Solicitor editing returned Blank order FL404B  by Judge - TS Solicitor application');
Scenario('Solicitor editing returned Blank order FL404B by Judge @nightly', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createNewCaseFL401_TS();
  await I.statementOfTruthAndSubmit();
  await I.solicitorDraftAnOrderBlankOrderFL404B();
  caseId = await I.saveTheCaseIdAndSignout();
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.selectOrderForReview();
  caseId = await I.saveTheCaseIdAndSignout();
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.moveCaseToGateKeeping();
  caseId = await I.saveTheCaseIdAndSignout();
  await I.loginAsSolicitor();
  await I.searchForCasesWithId(caseId);
  await I.editAReturnedOrderByJudge();
}).retry(testConfig.TestRetryScenarios);
