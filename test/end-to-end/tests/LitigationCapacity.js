Feature('Litigation capacity');

Scenario('Litigation capacity event', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.litigationCapacity();
}).retry({ retries: 3, minTimeout: 30000 });
