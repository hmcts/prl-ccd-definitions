Feature('Solicitor - Request Support');

Scenario(
  'C100 - Solicitor can access Request support at Draft state - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.verifyRequestSupportLinkAppear();
    await I.selectRA();
  }
).retry(1);

Scenario(
  'C100 - Solicitor can access Request support at Submit state - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.verifyRequestSupportLinkAppear();
    await I.runSubmitAndPayHappyPath();
    await I.selectRA();
  }
).retry(1);

Scenario(
  'FL401 - Solicitor can access Request support at Draft state - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createNewSolicitorDummyFL401Case();
    await I.verifyRequestSupportLinkAppear();
    await I.selectRA();
  }
).retry(1);