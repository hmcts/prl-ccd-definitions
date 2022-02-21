Feature('Welsh language requirements Event for C100 and FL401 cases');

Scenario('Create an C100 case and Submit the Welsh language requirements event', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.welshLanguageRequirement();
}).retry({ retries: 3, minTimeout: 30000 });

Scenario('Create an FL401 case and Submit the Welsh language requirements event', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  await I.welshLanguageRequirement();
}).retry({ retries: 3, minTimeout: 30000 });
