Feature('People in the case');

Scenario('Create an event and Submit the People in the case workflow', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.runPeopleInTheCaseEvent();
}).retry({ retries: 3, minTimeout: 30000 });
