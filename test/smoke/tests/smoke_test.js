Feature('Smoke tests @smoke-tests');
Scenario('Sign in as local authority and create a case', async I => {
  await I.loginAsSolicitor();
  await I.createCaseAndReturnID();
//  const searchResultsCaseId = 'ccd-search-result .govuk-link';
//  I.navigateToCaseList();
//  I.grabCurrentUrl();
//  I.searchForCasesWithId(caseId);
//  I.grabCurrentUrl();
//  I.waitForElement(searchResultsCaseId);
//  I.grabCurrentUrl();
//  I.seeCaseInSearchResult(caseId);
});
