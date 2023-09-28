Feature('Solicitor Draft order Power of Arrest FL406 - TS Solicitor application');

Scenario('Solicitor Draft order Power of Arrest FL406 @nightly', async I => {
  await I.loginAsSolicitor();
  await I.createNewCaseFL401_TS();
  await I.statementOfTruthAndSubmit();
}).retry({ retries: 3, minTimeout: 30000 });