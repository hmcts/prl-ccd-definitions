Feature('Solicitor - Request Support');

Scenario(
  'C100 - Solicitor can access Request support at Draft state - RA for Documents in an alternative format - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.verifyRequestSupportLinkAppearUnderAdditionalInfo();
    await I.raiseSupportRequestForDocInAlternateType();
  }
).retry(1);

Scenario(
  'C100 - Solicitor can access Request support at Submit state - RA for Other - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.verifyRequestSupportLinkAppearUnderAdditionalInfo();
    await I.runSubmitAndPayHappyPath();
    await I.raiseSupportRequestForOtherType();
  }
).retry(1);

Scenario(
  'C100 - Solicitor raise Request support at Submit state - To get to, into and around our building - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.verifyRequestSupportLinkAppearUnderAdditionalInfo();
    await I.runSubmitAndPayHappyPath();
    await I.raiseSupportRequestForGetIntoInandAroundBuilding();
  }
).retry(1);

Scenario(
  'FL401 - Solicitor can access Request support at Draft state - @master',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createNewSolicitorDummyFL401Case();
    await I.verifyRequestSupportLinkAppearUnderAdditionalInfo();
    await I.raiseSupportRequestForDocInAlternateTypeDA();
  }
).retry(1);