Feature('Serve Final order for all children case moved to Closed status');

Scenario('Serve Final order to all children - Case closed @nightly', async I => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.createAnOrderC21_applicationrefused_AllChildrenNo();
  await I.serveFinalOrder();
  await I.createAnOrderC21_applicationrefused_AllChildrenYes();
  await I.serveFinalOrder_CaseClosed();
}).retry({ retries: 3, minTimeout: 30000 });