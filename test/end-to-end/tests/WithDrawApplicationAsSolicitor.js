Feature('Withdraw application as a Solicitor');

Scenario('Withdraw application as Solicitor @cross-browser', async I => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();

  await I.solicitorWithdrawApplication();
}).retry({ retries: 3, minTimeout: 30000 });
