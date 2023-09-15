Feature('CA Manage Order Upload Order - TS Court Admin');

Scenario('CA Manage Order Upload Order @nightly', async I => {
  await I.loginAsCourtAdmin();
  await I.createC100CaseByCourtAdmin();
  await I.manageOrderUploadOrderServeNowPersonally();
}).retry({ retries: 3, minTimeout: 30000 });