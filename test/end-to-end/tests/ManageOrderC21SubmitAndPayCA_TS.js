Feature('CA Submit and Pay');

Scenario('Manage Order C21 Create a Case and Submit/Pay-TS @nightly', async I => {
  await I.loginAsSolicitor();
  await I.createCase_TS();
  await I.runSubmitAndPayHappyPath();
  await I.runSubmitAndPay_TS();
  await I.loginAsCourtAdmin();
  await I.issueAndSendToLocalCourt();
  await I.manageOrderCreateOrderC21();
  await I.fillHearingDetails();
  await I.submitManageOrder();
}).retry({ retries: 3, minTimeout: 30000 });
