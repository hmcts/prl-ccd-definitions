Feature('Respondent details');

Scenario('Respondent details event', async I => {
    await I.loginAsSolicitor();
    await I.createCase();
    await I.respondentDetails();
}).retry({ retries: 3, minTimeout: 30000 });
