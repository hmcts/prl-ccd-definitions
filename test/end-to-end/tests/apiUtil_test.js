/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const CaseDatasetupManager = require('../restApiData/DataSetupManager');

Feature('API Util to create case and events ');

// eslint-disable-next-line no-unused-vars
let caseId = null;
Scenario('Create case and evenets till submit and pay @debug', async({ I }) => {
  const dataSetupObj = CaseDatasetupManager.getDataSetupForScenario('test1');

  while (dataSetupObj.state === 'running') {
    await I.wait('2');
    console.log('waiting for datasetup to complete');
  }
  caseId = dataSetupObj.caseId;
  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);
}).retry(testConfig.TestRetryScenarios);
