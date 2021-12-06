Feature('Allegations of harm');

Scenario('Create an event and Submit the Allegations of harm workflow', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.allegationsOfHarmEvent();
}).retry({ retries: 3, minTimeout: 30000 });