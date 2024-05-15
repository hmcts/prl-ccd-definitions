Feature('Solicitor Draft an order Blank order FL404B - TS Solicitor application');

Scenario('Solicitor Draft order Blank order FL404B @regression-suite', async I => {
  await I.loginAsSolicitor();
  await I.createNewCaseFL401_TS();
  await I.statementOfTruthAndSubmit();
  await I.solicitorDraftAnOrderBlankOrderFL404B();
}).retry({ retries: 3, minTimeout: 30000 });