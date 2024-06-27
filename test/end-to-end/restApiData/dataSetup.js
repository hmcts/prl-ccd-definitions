/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
const path = require('path');
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

// eslint-disable-next-line no-unused-vars
const uploadDocument = async(filePath, fileName) => {
  // const buffer = fs.readFileSync(filepath);
  // '/Users/sreekanth/work/moj/private-law/prl-ccd-definitions/test/resource/dummy.pdf'
  // eslint-disable-next-line no-shadow
  await I.executeScript(() => {
    const para = document.createElement('input');
    para.type = 'file';
    para.id = 'autosupportfile';
    const node = document.createTextNode('This is new.');
    para.appendChild(node);

    const element = document.getElementsByTagName('exui-header')[0];
    element.appendChild(para);
  });

  await I.attachFile('#autosupportfile', filePath);

  // eslint-disable-next-line no-shadow, no-unused-vars
  return await I.executeScript(async({ filePath, fileName }) => {
    const formData = new FormData();
    const docFile = document.getElementById('autosupportfile');
    formData.append('files', docFile.files[0], 'dummy.pdf');
    // const buffer = fs.readFileSync(filePath);
    // formData.append('files', new Blob([buffer]), 'dummy.pdf');

    // formData.append('files', new Blob([buffer], { type: 'application/pdf' }), 'dummy.pdf');
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
  }, { filePath, fileName });
};


const exuiUploadDoc = async(caseId, eventPath, fieldSelector, filePath) => {
  await I.startRecordingTraffic();
  await I.amOnPage(`https://manage-case.aat.platform.hmcts.net/cases/case-details/${caseId}`);
  await I.waitForElement('#next-step');
  await I.amOnPage(`https://manage-case.aat.platform.hmcts.net/cases/case-details/${caseId}/${eventPath}`);

  await I.waitForElement(fieldSelector);
  await I.attachFile(fieldSelector, filePath);
  await I.wait('5');

  const networkTraffic = await I.grabRecordedNetworkTraffics();

  const documentResponse = networkTraffic.find(traffic => {
    return traffic.url.includes('/documents');
  });
  const document = documentResponse.response.body._embedded.documents[0];
  const retVal = {
    document_url: document._links.self.href,
    document_binary_url: document._links.binary.href,
    document_filename: document.originalDocumentName
  };
  return retVal;
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

    const logPath = path.resolve(__dirname, '../../../../../output', `caseDataSetup_${this.caseId}.log`);
    fs.writeFileSync(logPath, '***** Case creation: \n');
    // fs.appendFileSync(logPath, JSON.stringify(caseCreateRes, null, '2'));

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
  }

  async caseSetupToServiceOfApplication() {
    // this.caseId = '1718896400762185';
    await this.caseSetupIssueToLocalCourt();
    await I.clearCookie();
    await I.loginAsSwanseaCourtAdmin();

    // eslint-disable-next-line no-unused-vars
    await I.waitForElement('exui-header');


    const midEventProcess = null;
    const eventRest = restApiData['Send to gatekeeper'];
    const res = await eventApi.submitEvent(this.caseId, eventRest, midEventProcess);
    eventRest.res = res;

    // Service of application
    const doc = await exuiUploadDoc(this.caseId, 'trigger/serviceOfApplication/serviceOfApplication2', '//div[@id = "specialArrangementsLetter_fileInputWrapper"]/../input', 'exuiSupport/restApiData/dummy.pdf');
    const soaRest = restApiData['Service of application'];
    soaRest.data.specialArrangementsLetter = doc;
    const soaRes = await eventApi.submitEvent(this.caseId, soaRest, midEventProcess);
    eventRest.res = soaRes;

    console.log(this.caseId);
  }
}

module.exports = DataSetup;
