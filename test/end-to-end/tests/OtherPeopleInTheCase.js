Feature('Other people in the case');

Scenario('Other people in the case event', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.otherPeopleInTheCase();
}).retry({ retries: 3, minTimeout: 30000 });