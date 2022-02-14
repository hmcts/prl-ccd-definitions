Feature('Respondent details event for C100 and FL400 Cases');

Scenario('Respondent details event for C100 Case', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.respondentDetailsC100();
}).retry({ retries: 3, minTimeout: 30000 });

Scenario('Respondent details event for FL401 Case', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.respondentDetailsFL401();
}).retry({ retries: 3, minTimeout: 30000 });
