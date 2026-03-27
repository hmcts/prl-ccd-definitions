const assert = require('assert');

const INITIAL_WAIT = 15;
const RETRIES = 3;
const MIN_TIMEOUT = 1000;
Feature('Smoke tests @smoke-tests');

Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();

  const caseId = await I.createCaseAndReturnID();
  console.log(`case id is ${caseId}`);
  assert.ok(caseId, 'Case ID should be defined');

  await I.loadCase(caseId);

  const formattedCaseId = caseId.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  console.log(`Formatted case id: ${formattedCaseId}`);
  await I.waitForText(formattedCaseId, INITIAL_WAIT);
  // Verify case ID visible on page
  await I.retry({ retries: RETRIES, minTimeout: MIN_TIMEOUT }).see(formattedCaseId);
}).retry(1);