Feature('Smoke tests @smoke-tests');
Scenario('Sign in as local authority and create a case', async I => {
  await I.loginAsSolicitor();
  const caseId = await I.createCaseAndReturnID();
  await I.navigateToCaseList();
  await I.grabCurrentUrl();
  await I.searchForCasesWithId(caseId);
  await I.seeCaseInSearchResult(caseId);
});
