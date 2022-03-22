Feature('Signin Details');

Scenario('Signin Details - basic journey for C100 Casetype', async I => {
  await I.goToSignInPage();
  // await I.signInAsCaseWorker();
}).retry({ retries: 3, minTimeout: 30000 });
