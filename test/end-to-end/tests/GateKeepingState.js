Feature('Move case to Gatekeeping State');

Scenario('Move case to Gatekeeping State @cross-browser  @master', async I => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  const caseId = await I.saveTheCaseIdAndSignout();
  const searchResultsCaseId = 'ccd-search-result .govuk-link';
  await I.searchForCasesWithId(caseId);
  await I.searchForCaseAndOpenCase(caseId);
  await I.issueCase();
  await I.moveCaseToGateKeeping();
}).retry({ retries: 3, minTimeout: 30000 });