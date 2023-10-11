Feature('Help with Fee - Solicitor - CA Submit - Error message');

Scenario(
  'Solicitor Help With Fee - YES option - Create CA Submit -  Error message @nightly @playwright',
  async({ I }) => {
    await I.loginAsSolicitor();
    await I.createCase_TS();
    await I.runSubmitAndPayHappyPath_HWF_Yes();
  }
).retry(1);
