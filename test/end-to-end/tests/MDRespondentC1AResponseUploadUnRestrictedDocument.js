Feature('Manage Document - Non Restricted Document - Solicitor - CA Submit and Pay - TS');

Scenario('Manage Document - Respondent C1A Response - Non Restricted Document - Create CA Submit and Pay-TS @nightly', async({ I }) => {
  // await I.loginAsSolicitor();
  // await I.createCase_TS();
  // await I.runSubmitAndPayHappyPath();
  // await I.runSubmitAndPay_TS();
  // await I.uploadUnRestrictedDocManageDocuments();
  await I.loginAsCourtAdmin();
  await I.verifyRespondentC1AResponseFile();
}).retry({ retries: 3, minTimeout: 30000 });
