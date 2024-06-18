/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const caseEvent = require('../utilities/caseEventApi');
const eventApi = require('../utilities/caseEventApi');
const restApiData = require('../restApiData/prlapps');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('API Util to create case and events ');


Scenario('Create case and evenets till submit and pay @debug', async ({ I }) => {
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
    console.log(`************** RUNNING EVENT ${event}`);
    const eventRest = restApiData[event];
    const res = await eventApi.submitEvent(caseId, eventRest.eventId, eventRest.data);
    eventRest.res = res;
  }

  console.log(caseId);
  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);
}).retry(testConfig.TestRetryScenarios);
