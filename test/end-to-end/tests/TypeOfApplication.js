Feature('Type of Application');

Scenario('Create a case and Submit the Type of Application workflow @smoke-tests', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.typeOfApplicationEvent();
}).retry({ retries: 3, minTimeout: 30000 });


Scenario('Create an FL401 case and Submit the Type of Application Event workflow', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.typeOfApplicationEventFL401();
}).retry({ retries: 3, minTimeout: 30000 });
