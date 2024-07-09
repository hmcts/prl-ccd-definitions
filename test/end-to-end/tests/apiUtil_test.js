/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const CaseDatasetupManager = require('../restApiData/DataSetupManager');
const CitizenCaseCreate = require('../citizenFrontendSupport/caseCreate');

Feature('API Util to create case and events ');

// eslint-disable-next-line no-unused-vars
let caseId = null;
Scenario('Create case and evenets till submit and pay', async({ I }) => {
  const dataSetupObj = CaseDatasetupManager.getDataSetupForScenario('test1');

  while (dataSetupObj.state === 'running') {
    await I.wait('2');
    console.log('waiting for datasetup to complete');
  }
  caseId = dataSetupObj.caseId;
  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);
}).retry(testConfig.TestRetryScenarios);

Scenario('Citizen case create', async({ I }) => {
  await I.wait('1');
  const caseCreate = new CitizenCaseCreate();
  await caseCreate.init();
  caseId = await caseCreate.run();

  console.log(caseId);
}).retry(testConfig.TestRetryScenarios);
