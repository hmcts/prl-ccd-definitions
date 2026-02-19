Feature('Smoke tests @smoke-tests');
Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();
  const caseId = await I.createCaseAndReturnID();
  await I.navigateToCaseList();
  console.log('case id is ${caseId}');
  await I.searchForCasesWithId(caseId);
  await I.seeCaseInSearchResult(caseId);
}).retry(1);
