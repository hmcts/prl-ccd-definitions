Feature('Move case to Gatekeeping State');

Scenario('Move case to Gatekeeping State @cross-browser', async I => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  const caseId = await I.saveTheCaseIdAndSignout();
  await I.searchForCaseAndOpenCase(caseId);
  //to do
//  await I.issueCaseAndMoveToLocalCourt();
//  await I.moveCaseToGateKeeping();
}).retry({ retries: 3, minTimeout: 30000 });