/* eslint-disable no-await-in-loop */
const fs = require('fs');
const testConfig = require('../config');
const caseEvent = require('../utilities/caseEventApi');
const eventApi = require('../utilities/caseEventApi');
const restApiDataTemplate = require('../restApiData/prlapps');

const restApiData = JSON.parse(JSON.stringify(restApiDataTemplate));
/* eslint init-declarations: ["error", "never"]*/
let caseId;


const childAndApplicantProcess = (eventRestObj, startDEventRes) => {
  const eventDataField = startDEventRes.case_fields.find(field => {
    return field.id === 'buffChildAndApplicantRelations';
  });

  eventDataField.value[0].value.childAndApplicantRelation = 'mother';
  eventDataField.value[0].value.childLivesWith = 'No';
  eventRestObj.data.buffChildAndApplicantRelations = eventDataField.value;
};

const childAndRespondentProcess = (eventRestObj, startDEventRes) => {
  const eventDataField = startDEventRes.case_fields.find(field => {
    return field.id === 'buffChildAndRespondentRelations';
  });

  eventDataField.value[0].value.childAndRespondentRelation = 'mother';
  eventDataField.value[0].value.childLivesWith = 'No';
  eventRestObj.data.buffChildAndRespondentRelations = eventDataField.value;
};

const childAndOtherPeopleProcess = (eventRestObj, startDEventRes) => {
  const eventDataField = startDEventRes.case_fields.find(field => {
    return field.id === 'buffChildAndOtherPeopleRelations';
  });

  eventDataField.value[0].value.childAndOtherPeopleRelation = 'mother';
  eventDataField.value[0].value.childLivesWith = 'No';
  eventRestObj.data.buffChildAndOtherPeopleRelations = eventDataField.value;
};

const submitAndPayProcess = (eventRestObj, startDEventRes) => {
  const eventDataField = startDEventRes.case_fields.find(field => {
    return field.id === 'submitAndPayDownloadApplicationLink';
  });
  eventRestObj.data.submitAndPayDownloadApplicationLink = eventDataField.value;
};


Feature('API Util to create case and events ');


Scenario('Create case and evenets till submit and pay', async ({ I }) => {
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
    'Submit and pay',
    'Dummy Payment confirmation'

  ];

  for (const event of events) {
    console.log(`************** RUNNING EVENT ${event}`);
    const eventRest = restApiData[event];

    let midEventProcess;
    if (event === 'Children and applicants') {
      midEventProcess = childAndApplicantProcess;
    } else if (event === 'Children and respondents') {
      midEventProcess = childAndRespondentProcess;
    } else if (event === 'Children and other people') {
      midEventProcess = childAndOtherPeopleProcess;
    } else if (event === 'Submit and pay') {
      midEventProcess = submitAndPayProcess;
    }

    const res = await eventApi.submitEvent(caseId, eventRest, midEventProcess);
    eventRest.res = res;
  }

  console.log(caseId);
  fs.writeFileSync(`${__dirname}/apoCaseCreationResult.json`, JSON.stringify(restApiData, null, '2'));
  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);
}).retry(testConfig.TestRetryScenarios);
