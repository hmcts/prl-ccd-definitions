Feature('Relationship to respondent');

Scenario('Relationship to respondent - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.runRelationshipToRespondent();
}).retry({ retries: 3, minTimeout: 30000 });
