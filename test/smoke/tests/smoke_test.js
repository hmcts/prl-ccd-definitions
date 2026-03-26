const assert = require('assert');

const INITIAL_WAIT = 2;

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();

  const caseId = await I.createCaseAndReturnID();
  console.log(`case id is ${caseId}`);
  assert.ok(caseId, 'Case ID should be defined');

  await I.wait(INITIAL_WAIT);

  await I.restartBrowser();
  console.log(`${process.env.XUI_WEB_URL}/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
  await I.amOnPage(`/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
}).retry(1);