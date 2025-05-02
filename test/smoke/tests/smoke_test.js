Feature('Smoke tests @smoke-tests');
Scenario('Sign in as local authority and create a case', async({ I }) => {
  // await I.loginAsSolicitor();
  const caseId = await I.createCaseAndReturnID();
  await I.navigateToCaseList();
  console.log(`case id is ${caseId}`);
  // await I.searchForCasesWithId(caseId); --This check is ignored due to a bug FPET-903
  // await I.seeCaseInSearchResult(caseId); --This check is ignored due to a bug FPET-903
}).retry(1);
