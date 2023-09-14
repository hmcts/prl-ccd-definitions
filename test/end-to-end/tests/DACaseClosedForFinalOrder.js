Feature('DA Serve Final order and case moved to Closed status');

Scenario('DA Serve Final order - Case closed @nightly', async I => {
  await I.loginAsCourtAdmin();
  await I.createFL401CaseByCourtTSAdmin();
  await I.createAnFL404B_AboutChildrenNo();
  await I.serveFinalOrderDA_CaseClosed();
}).retry({ retries: 3, minTimeout: 30000 });