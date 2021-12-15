Feature('View PDF Application');

Scenario('Create an event and download Application', async I => {
    await I.loginAsSolicitor();
    await I.createCase();
    await I.viewPDFApplicationEvent();
}).retry({ retries: 3, minTimeout: 30000 });