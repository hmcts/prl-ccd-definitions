/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const DataSetup = require('../restApiData/dataSetup');


Feature('API Util to create case and events ');


Scenario('Create case and evenets till submit and pay', async({ I }) => {
  await I.wait('1');
  const dataSetup = new DataSetup();
  await dataSetup.caseSetupSendToGatekeeper();

  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);
}).retry(testConfig.TestRetryScenarios);
