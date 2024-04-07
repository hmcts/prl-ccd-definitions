Feature('Solicitor Draft order Power of Arrest FL406 - TS Solicitor application');

Scenario('Solicitor Draft order Power of Arrest FL406 @regression-suite', async I => {
  await I.loginAsSolicitor();
  await I.createNewCaseFL401_TS();
  await I.statementOfTruthAndSubmit();
  await I.solicitorDraftAnOrderPowerOfArrestFL406();
}).retry({ retries: 3, minTimeout: 30000 });