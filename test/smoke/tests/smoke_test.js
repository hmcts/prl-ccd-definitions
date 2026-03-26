const assert = require('assert');

const HTTP_STATUS_OK = 200;


Feature('Smoke tests @smoke-tests');
Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();

  const caseId = await I.createCaseAndReturnID();
  console.log(`case id is ${caseId}`);
  assert.ok(caseId, 'Case ID should be defined');

  const response = await I.sendGetRequest(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
  assert.strictEqual(response.status, HTTP_STATUS_OK, 'Case should exist');

  await I.amOnPage(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
}).retry(1);
