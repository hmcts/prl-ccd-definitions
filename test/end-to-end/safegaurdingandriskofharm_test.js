Feature('Safegaurding And Risk of Harm');

Scenario.skip('Create an event and Submit the Safeguarding and Risk of Harm workflow', I => {
  I.loginAsSolicitor();
  I.createCase();
}).retry({ retries: 3, minTimeout: 30000 });
