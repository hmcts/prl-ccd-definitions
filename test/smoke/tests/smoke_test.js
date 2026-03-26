const assert = require('assert');

const INITIAL_WAIT = 2;

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();

  const caseId = await I.createCaseAndReturnID();
  console.log(`case id is ${caseId}`);
  assert.ok(caseId, 'Case ID should be defined');

  await I.wait(INITIAL_WAIT);

  const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/').concat(caseId);

  console.log(`Page url is ${pageUrl}`);
  await I.amOnPage(pageUrl);
}).retry(1);