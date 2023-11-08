const testConfig = require('../config');

Feature('As a Court admin filter cases');
Scenario('Filter case by state and application type @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.navigateToCaseList();
  await I.searchForCaseWithoutId();
  await I.verifySearchResultsFilteredByState();
  await I.additionFilteringByApplicationType();
  await I.verifySearchResultsFilteredByStateAndApplicationType();
}).retry(testConfig.TestRetryScenarios);

Scenario('Filter case with invalid ccd number @nightly', async({ I }) => {
  await I.loginAsCourtAdmin();
  await I.navigateToCaseList();
  await I.searchForInvalidCase();
  await I.verifyInvalidSearchResults();
}).retry(testConfig.TestRetryScenarios);