/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const CaseDatasetupManager = require('../restApiData/DataSetupManager');

/* eslint init-declarations: ["error", "never"]*/
let caseId;

Feature('cafcass journey: PRL-4089');

Scenario('Case datasetup for cafcass journey test @regression-suite', async({ I }) => {
  const dataSetupObj = CaseDatasetupManager.getDataSetupForScenario('cafcass_journey_test');

  while (dataSetupObj.state === 'running') {
    await I.wait('2');
    console.log('waiting for datasetup to complete');
  }
  caseId = dataSetupObj.caseId;
  // const addCaseNoteRest = restApiData['Add case note'];
  // await eventApi.submitEvent(caseId, addCaseNoteRest.eventId, addCaseNoteRest.data);
}).retry(testConfig.TestRetryScenarios);

Scenario('Add cafcass officer @regression-suite', async({ I }) => {
  await I.loginAsCafcassUser();
  await I.searchForCasesWithId(caseId);
  await I.asCafcassUserPerformEventAddCafcassOfficer();
}).retry(testConfig.TestRetryScenarios);

Scenario('As solicitor Verify Added cafcass officer details in Parties tab @regression-suite', async({ I }) => {
  await I.loginAsSolicitor();
  await I.searchForCasesWithId(caseId);
  await I.verifyCaffcassOfficerDetails();
}).retry(testConfig.TestRetryScenarios);

Scenario('As caseffcass officer Verify Added cafcass officer details in Parties tab', async({ I }) => {
  await I.loginAsCafcassUser();
  await I.searchForCasesWithId(caseId);
  await I.verifyCaffcassOfficerDetails();
}).retry(testConfig.TestRetryScenarios);

Scenario('Manage documents @regression-suite', async({ I }) => {
  await I.loginAsCafcassUser();
  await I.searchForCasesWithId(caseId);
  await I.asCafcassUserPerformEventManageDocuments();
}).retry(testConfig.TestRetryScenarios);

Scenario('Verify cafcass uploaded documents @regression-suite', async({ I }) => {
  await I.loginAsCafcassUser();
  await I.searchForCasesWithId(caseId);
  await I.asCafcassUserVerifyCafcassUploadedDocuments();
}).retry(testConfig.TestRetryScenarios);
