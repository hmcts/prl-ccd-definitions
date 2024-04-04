Feature('Smoke tests @smoke-tests');
Scenario('Sign in as local authority and create a case', async I => {
  await I.loginAsSolicitor();
//  const caseId = await I.createCaseAndReturnID();
//  const searchResultsCaseId = 'ccd-search-result .govuk-link';
//  I.navigateToCaseList();
//  I.grabCurrentUrl();
//  I.searchForCasesWithId(caseId);
//  I.grabCurrentUrl();
//  I.waitForElement(searchResultsCaseId);
  // The following test cases are no longer required as 'ccd-search-result .govuk-link' takes care of searching the case created.
  // I.grabCurrentUrl();
  // I.seeCaseInSearchResult(caseId);
});
