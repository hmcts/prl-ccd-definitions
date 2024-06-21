/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
const path = require('path');
const { Blob } = require('node:buffer');
const fs = require('fs');
const caseEvent = require('../utilities/caseEventApi');
const eventApi = require('../utilities/caseEventApi');
const restApiDataTemplate = require('./prlapps');

const I = actor();
const restApiData = JSON.parse(JSON.stringify(restApiDataTemplate));


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

const uploadDocument = async(filepath, filename) => {
  const buffer = fs.readFileSync(filepath);
  // '/Users/sreekanth/work/moj/private-law/prl-ccd-definitions/test/resource/dummy.pdf'
  // eslint-disable-next-line no-shadow
  return await I.executeScript(async({ buffer, filename }) => {
    const formData = new FormData();

      formData.append('files', new Blob([buffer], { type: 'application/pdf' }), filename);
    formData.append('classification', 'PUBLIC');

    const res = await fetch('/documents', {
      method: 'POST',
      body: formData,
      headers: {
          Accept: 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br, zstd'
      }
    });
    return res;
  }, { buffer, filename });
};

class DataSetup {
  constructor() {
    this.caseId = null;
  }

  async caseStateSubmitAndPay() {
    await I.clearCookie();
    await I.loginAsSolicitor();

    const createCaseRest = restApiData['Solicitor application'];
    const caseCreateRes = await caseEvent.createCase('PRLAPPS', createCaseRest.eventId, createCaseRest.data);

    this.caseId = caseCreateRes.id;
    console.log(this.caseId);

    const SolicitorEvents = [
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

    for (const event of SolicitorEvents) {
      console.log(`************** RUNNING EVENT ${event}`);
      const eventRest = restApiData[event];

      let midEventProcess = null;
      if (event === 'Children and applicants') {
        midEventProcess = childAndApplicantProcess;
      } else if (event === 'Children and respondents') {
        midEventProcess = childAndRespondentProcess;
      } else if (event === 'Children and other people') {
        midEventProcess = childAndOtherPeopleProcess;
      } else if (event === 'Submit and pay') {
        midEventProcess = submitAndPayProcess;
      }

      const res = await eventApi.submitEvent(this.caseId, eventRest, midEventProcess);
      eventRest.res = res;
      console.log(this.caseId);
    }
    fs.writeFileSync(`${__dirname}/apiCaseCreationResult.json`, JSON.stringify(restApiData, null, '2'));
  }

  async caseSetupIssueToLocalCourt() {
    await this.caseStateSubmitAndPay();
    await I.clearCookie();
    await I.loginAsStokeCourtAdmin();
    const midEventProcess = null;
    const eventRest = restApiData['Issue and send to local court'];
    const res = await eventApi.submitEvent(this.caseId, eventRest, midEventProcess);
    eventRest.res = res;

    console.log(this.caseId);
    fs.writeFileSync(`${__dirname}/apiCaseCreationResult.json`, JSON.stringify(restApiData, null, '2'));
  }

  async caseSetupSendToGatekeeper() {
    this.caseId = '1718896400762185';
    // await this.caseSetupIssueToLocalCourt();
    // await I.clearCookie();
    await I.loginAsSwanseaCourtAdmin();

    const docUploadRes = await uploadDocument(path.resolve(__dirname, '../../resource/dummy.pdf'), 'dummy.pdf');

    const midEventProcess = null;
    const eventRest = restApiData['Send to gatekeeper'];
    const res = await eventApi.submitEvent(this.caseId, eventRest, midEventProcess);
    eventRest.res = res;

    console.log(this.caseId);
    fs.writeFileSync(`${__dirname}/apiCaseCreationResult.json`, JSON.stringify(restApiData, null, '2'));
  }
}

module.exports = DataSetup;
