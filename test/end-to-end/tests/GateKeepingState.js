Feature('Move case to Gatekeeping State');

Scenario('Move case to Gatekeeping State @master', async I => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  const caseId = await I.saveTheCaseIdAndSignout();
  await I.searchForCasesWithId(caseId);
  await I.issueCase();
  await I.moveCaseToGateKeeping();
}).retry({ retries: 3, minTimeout: 30000 });