Feature('DO-Attending the hearing');

Scenario('DO-Attending the hearing - basic journey', async I => {
  await I.loginAsSolicitor();
  await I.createCaseFL401();
  //await I.runDOAttendingTheHearingEvent();
}).retry({ retries: 3, minTimeout: 30000 });
