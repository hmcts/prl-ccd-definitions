Feature('Case Name Change');

Scenario('Case Name - basic journey @cross-browser', async I => {
  await I.loginAsSolicitor();
//  await I.createCase();
//  await I.caseNameChange();
}).retry({ retries: 3, minTimeout: 30000 });
