Feature('Manage Documents');

Scenario('Create an event and Submit the Supporting Documents', async I => {
    await I.loginAsSolicitor();
    await I.createCase();
    await I.runManageDocuments();
}).retry({ retries: 3, minTimeout: 30000 });