Feature('CA Submit and Pay');

Scenario('Create a Case and Submit/Pay ', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.caseNameChange();
}).retry({ retries: 3, minTimeout: 30000 });
