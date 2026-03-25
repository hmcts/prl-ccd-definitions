Feature('Smoke tests @smoke-tests');
Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();
}).retry(1);
