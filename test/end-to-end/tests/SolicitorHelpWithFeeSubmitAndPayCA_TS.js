Feature('Help with Fee - Solicitor - CA Submit and Pay - TS');

Scenario('Solicitor Help With Fee - No option- Create CA Submit and Pay-TS @nightly', async I => {
  await I.loginAsSolicitor();
  await I.createCase_TS();
  await I.runSubmitAndPayHappyPath();
  await I.runSubmitAndPay_TS();
}).retry({ retries: 3, minTimeout: 30000 });
