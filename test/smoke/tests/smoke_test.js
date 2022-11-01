Feature('Smoke tests @smoke-tests');
searchResultsTopPagination = $('ccd-search-result .govuk-link');
Scenario('Sign in as local authority and create a case', async I => {
  await I.loginAsSolicitor();
  const caseId = await I.createCaseAndReturnID();
  I.navigateToCaseList();
  I.grabCurrentUrl();
  I.searchForCasesWithId(caseId);
  I.grabCurrentUrl();
  I.waitForElement(searchResultsTopPagination);
  I.grabCurrentUrl();
  I.seeCaseInSearchResult(caseId);
});
