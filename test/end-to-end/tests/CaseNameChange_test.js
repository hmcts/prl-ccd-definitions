Feature('Case Name Change');
Scenario('Case Name - basic journey @nightly @cross-browser', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createCase();
  await I.caseNameChange();
});
