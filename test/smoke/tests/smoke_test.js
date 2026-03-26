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


  const pageUrl = `${process.env.XUI_WEB_URL}`.concat('/case-details/PRIVATELAW/PRLAPPS/').concat(caseId);

  console.log(`Page url is ${pageUrl}`);
  await I.amOnPage(pageUrl);
  await I.waitForElement('body.govuk-template__body.js-enabled', INITIAL_WAIT);
  const formattedCaseId = caseId.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  console.log(`Formatted case id: ${formattedCaseId}`);
  // Verify case ID visible on page
  await I.see(formattedCaseId);
}).retry(1);