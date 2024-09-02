/* eslint-disable no-await-in-loop */
const { chromium } = require('playwright');

const testConfig = require('../config');
const CaseDataSetup = require('../restApiData/CaseDataSetupV2');
const CitizenCaseCreate = require('../citizenFrontendSupport/caseCreate');

Feature('Citizen Journey - Create SOA @nightly');

// eslint-disable-next-line no-unused-vars
let caseId = null;

Scenario('Datasetup: Citizen case create', async() => {
  const caseCreate = new CitizenCaseCreate();
  await caseCreate.init();
  try {
    caseId = await caseCreate.runC100({});
    await caseCreate.exit();
  } catch (caseCreateErr) {
    await caseCreate.exit();
    throw caseCreateErr;
  }
  console.log(caseId);
}).retry(testConfig.TestRetryScenarios);


Scenario('Datasetup: Serve order', async() => {
  const browser = await chromium.launch({ headless: false });
  const caseDataSetup = new CaseDataSetup(browser);
  await caseDataSetup.initBrowser();
  await caseDataSetup.login(testConfig.legalProfessionalUserTwo.email, testConfig.legalProfessionalUserTwo.password);
  await caseDataSetup.performEvent(caseId, 'Issue and send to local court');

  await caseDataSetup.login(testConfig.caseManagerUser.email, testConfig.caseManagerUser.password);
  await caseDataSetup.performEvent(caseId, 'Send to gatekeeper');

  await caseDataSetup.performEvent(caseId, 'Amend applicant details');
  await browser.close();
}).retry(testConfig.TestRetryScenarios);

Scenario('Solicitor - Notice of change journey test', async({ I }) => {
  await I.loginAsSolicitor();
  await I.submitAndVerifyNOCForApplicantCase(caseId, 'John', 'Doe');
}).retry(testConfig.TestRetryScenarios);


Scenario('As a court admin edit & serve an order @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.performCitizenServingSOA();
}).retry(testConfig.TestRetryScenarios);

Scenario('As an Applicant Solicitor execute Statement of service @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.searchForCasesWithId(caseId);
  await I.completeStatementOfService();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Verify Statement of service in SOA tab @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.verifyPostStatementOfService();
}).retry(testConfig.TestRetryScenarios);


Scenario('Solicitor - Notice of change journey test', async({ I }) => {
  await I.loginAsRespondentSolicitor();
  await I.submitAndVerifyNOCForApplicantCase(caseId, 'Mary', 'Richards');
}).retry(testConfig.TestRetryScenarios);
