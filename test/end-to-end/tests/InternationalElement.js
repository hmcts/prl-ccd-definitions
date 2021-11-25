Feature('International element');

Scenario('International element event', async I => {
    await I.loginAsSolicitor();
    await I.createCase();
    await I.internationalElement();
}).retry({ retries: 3, minTimeout: 30000 });
