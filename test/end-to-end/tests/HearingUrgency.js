Feature('Hearing urgency');

Scenario('Hearing urgency event', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.hearingUrgency();
}).retry({ retries: 3, minTimeout: 30000 });
