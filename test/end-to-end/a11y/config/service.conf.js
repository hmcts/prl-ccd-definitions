const browser = 2;

module.exports = {
  CcdGatewayUrl: process.env.TEST_E2E_URL_GATEWAY || 'https://gateway-ccd.aat.platform.hmcts.net',
  CcdWebUrl: process.env.TEST_E2E_URL_WEB || 'https://manage-case.aat.platform.hmcts.net/cases?jurisdiction=PRIVATELAW',
  ApiCallTimeout: 40000,
  UseHeadlessBrowser: process.env.TEST_E2E_HEADLESS !== 'false',
  TestCaseOfficerUserName: process.env.TEST_CASEOFFICER_USERNAME || '',
  TestCaseOfficerPassword: process.env.TEST_CASEOFFICER_PASSWORD || '',
  TestJudgeUserName: process.env.TEST_JUDGE_USERNAME || '',
  TestJudgePassword: process.env.TEST_JUDGE_PASSWORD || '',
  TestDWPResponseWriterUserName: process.env.TEST_DWP_USERNAME || '',
  TestDWPResponseWriterPassword: process.env.TEST_DWP_PASSWORD || '',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './reports/tests',

  ProxyUrl: process.env.TEST_E2E_URL_PROXY || '',
  RunWithNumberOfBrowsers: process.env.TEST_E2E_NUM_BROWSERS || browser,
  UseProxy: process.env.TEST_E2E_USE_PROXY === 'false',
  WaitForAngular: process.env.TEST_E2E_WAIT_FOR_ANGULAR !== 'false',
  FailFast: process.env.TEST_E2E_FAIL_FAST !== 'false',
  TestsForCrossBrowser: process.env.TEST_FOR_CROSS_BROWSER || 'false',


  NightlyTag: process.env.TEST_E2E_ANNOTATION || '--cucumberOpts.tags=@nightly-test'

};