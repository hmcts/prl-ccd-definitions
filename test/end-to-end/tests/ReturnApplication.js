Feature('Return application');

Scenario('Create an event and submit Return application event', async I => {
  await I.loginAsCourtAdmin();
  await I.createCase();
  //await I.runPeopleInTheCaseEvent();
}).retry({ retries: 3, minTimeout: 30000 });
