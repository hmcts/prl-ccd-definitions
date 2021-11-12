Feature('Attending the hearing');

Scenario('Attending the hearing - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.runAttendingTheHearingEvent();
}).retry({ retries: 3, minTimeout: 30000 });
