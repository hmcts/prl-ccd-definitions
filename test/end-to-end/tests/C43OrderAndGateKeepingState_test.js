/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const caseEvent = require('../utilities/caseEventApi');
const eventApi = require('../utilities/caseEventApi');
const restApiData = require('../restApiData/prlapps');
/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('Solicitor - Manage order, Gatekeeping & Service of application tests ');


Scenario('Courtadmins add note via API @debug', async({ I }) => {
  caseId = '1718176793256925';
  await I.loginAsSolicitor();

  const createCaseRest = restApiData['Solicitor application'];
  const caseCreateRes = await caseEvent.createCase('PRLAPPS', createCaseRest.eventId, createCaseRest.data);

  caseId = caseCreateRes.id;
  console.log(caseId);

  const events = [
    'Add case name',
    'Type of application',
    'Hearing urgency',
    'Child details',
    'Applicant details',
    'Respondent details',
    'Other people in the case',
    'Other children not in the case',
    'Children and applicants',
    'Children and respondents',
    'Children and other people',
    'Allegations of harm',
    'MIAM',
    'Other proceedings',
    'Attending the hearing',
    'International element',
    'Litigation capacity',
    'Welsh language requirements',
    'Submit and pay'

  ];
  for (const event of events) {
    console.log(`************** RUNNING EVENT ${event}`)
    const eventRest = restApiData[event];
    await eventApi.submitEvent(caseId, eventRest.eventId, eventRest.data);
  }

  console.log(caseId);
  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);


}).retry(testConfig.TestRetryScenarios);

Scenario('Draft an Solicitor Order & Move case to Gatekeeping State @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.createSolicitorDummyCase();
  await I.payAndSubmitDummySolicitorCase();
  await I.draftAnOrder();
  caseId = await I.saveTheCaseIdAndSignInAsStokeCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.issueCase();
  await I.saveTheCaseIdAndSignInAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.moveCaseToGateKeeping();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a Judge edit & change a draft order @regression-suite ', async({ I }) => {
  await I.loginAsJudge();
  await I.searchForCasesWithId(caseId);
  await I.editAnDraftOrderCreatedBySolicitor();
}).retry(testConfig.TestRetryScenarios);


Scenario('As a court admin edit & serve an order @regression-suite', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.serveAnOrder();
  await I.performServiceOfApplication();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a Case Manager Confidentiality Check @regression-suite ', async({ I }) => {
  await I.loginAsCaseManager();
  await I.searchForCasesWithId(caseId);
  await I.caseManagerConfidentialityCheck();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Verify SOA and Task tab after Confidentiality check @regression-suite ', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.verifyPostConfidentialityCheck_Yes();
}).retry(testConfig.TestRetryScenarios);

Scenario('As an Applicant Solicitor execute Statement of service @regression-suite ', async({ I }) => {
  await I.loginAsSolicitor();
  await I.searchForCasesWithId(caseId);
  await I.completeStatementOfService();
}).retry(testConfig.TestRetryScenarios);

Scenario('As a court admin Verify Statement of service in SOA tab @regression-suite ', async({ I }) => {
  await I.loginAsSwanseaCourtAdmin();
  await I.searchForCasesWithId(caseId);
  await I.verifyPostStatementOfService();
}).retry(testConfig.TestRetryScenarios);


Scenario('Solicitor - Notice of change journey test ', async({ I }) => {
  await I.loginAsRespondentSolicitor();
  await I.submitAndVerifyNOCForCaseWithId(caseId);
}).retry(testConfig.TestRetryScenarios);
