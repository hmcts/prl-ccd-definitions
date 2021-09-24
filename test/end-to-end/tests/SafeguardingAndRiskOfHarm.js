Feature('Safeguarding And Risk of Harm');

Scenario('Create an event and Submit the Safeguarding and Risk of Harm workflow', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
}).retry({ retries: 3, minTimeout: 30000 });
