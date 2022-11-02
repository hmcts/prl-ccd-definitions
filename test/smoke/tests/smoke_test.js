Feature('Smoke tests @smoke-tests');

Scenario('Sign in as local authority and create a case', async I => {
  await I.loginAsSolicitor();
  const caseId = await I.createCaseAndReturnID();
  I.navigateToCaseList();
  I.grabCurrentUrl();
  I.searchForCasesWithId(caseId);
  I.grabCurrentUrl();
  I.waitForElement({ xpath: `//ccd-search-result/table/tbody//tr//td//a[contains(@href,'/cases/case-details/${caseId}')]` });
  I.grabCurrentUrl();
  I.seeCaseInSearchResult(caseId);
});