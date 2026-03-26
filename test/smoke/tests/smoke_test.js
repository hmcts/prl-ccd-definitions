const assert = require('assert');

const INITIAL_WAIT = 2;
const PAGE_LOAD_WAIT = 15;

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as Solicitor and create a case', async({ I }) => {
  await I.loginAsSolicitor();

  const caseId = await I.createCaseAndReturnID();
  console.log(`case id is ${caseId}`);
  assert.ok(caseId, 'Case ID should be defined');

  await I.wait(INITIAL_WAIT);

  // Navigate to case details page
  await I.amOnPage(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
  await I.waitForElement('.govuk-summary-list, h1, body', PAGE_LOAD_WAIT);
  const formattedCaseId = caseId.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  console.log(`Formatted case id: ${formattedCaseId}`);
  // Verify case ID visible on page
  const pageCaseId = await I.grabTextFrom('.govuk-summary-list__value');
  assert.ok(pageCaseId.includes(formattedCaseId), 'Case ID visible on case details page');
}).retry(1);