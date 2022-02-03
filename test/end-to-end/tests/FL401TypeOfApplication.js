Feature('FL401 Type of Application Event');

Scenario('Create an FL401 case and Submit the Type of Application Event workflow', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
}).retry({ retries: 3, minTimeout: 30000 });
