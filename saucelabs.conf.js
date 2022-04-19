/* eslint-disable */

const testConfig = require('./test/end-to-end/config.js');
const supportedBrowsers = require('./test/end-to-end/crossbrowser/supportedBrowsers.js');
//const testUserConfig = require('./test/end-to-end/config.js').config;
// eslint-disable-next-line no-magic-numbers
const waitForTimeout = parseInt(process.env.WAIT_FOR_TIMEOUT) || 50000;
// eslint-disable-next-line no-magic-numbers
const smartWait = parseInt(process.env.SMART_WAIT) || 50000;
const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
  acceptSslCerts: true,
  tags: ['Private Law'],
  maxDuration: 5000,
};

function merge(intoObject, fromObject) {
  return Object.assign({}, intoObject, fromObject);
}

function getBrowserConfig(browserGroup) {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const candidateCapabilities = supportedBrowsers[browserGroup][candidateBrowser];
      candidateCapabilities['sauce:options'] = merge(defaultSauceOptions, candidateCapabilities['sauce:options']);
      browserConfig.push({
        browser: candidateCapabilities.browserName,
        capabilities: candidateCapabilities,
      });
    } else {
      console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
}

const setupConfig = {
  tests: './test/end-to-end/tests/*.js',
  //teardown: testUserConfig.teardown,
  output: `${process.cwd()}/${testConfig.TestOutputDir}`,
  helpers: {
    WebDriver: {
      url: process.env.TEST_URL,
      keepCookies: true,
      browser,
      smartWait,
      waitForTimeout,
      cssSelectorsEnabled: 'true',
      host: 'ondemand.eu-central-1.saucelabs.com',
      port: 80,
      region: 'eu',
      capabilities: {},
    },
    SauceLabsReportingHelper: {
      require: './test/end-to-end/helpers/SauceLabsReportingHelper.js',
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
    GeneralHelper: { require: './test/end-to-end/helpers/generalHelper.js' },
    PuppeteerHelpers: { require: './test/end-to-end/helpers/puppeterHelper.js' },
    GenerateReportHelper: { require: './test/end-to-end/helpers/generateReportHelper.js' }
  },
  plugins: {
    //autoLogin: testUserConfig.AutoLogin,
    retryFailedStep: {
      enabled: true,
      retries: 2,
    },
    autoDelay: {
      enabled: true,
      delayAfter: 1000,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
  },
  /*eslint-disable */
  include: {
    I: './test/end-to-end/steps_file.js',
    config: './test/end-to-end/config.js',
    loginPage: './test/end-to-end/pages/Login.js',
    createCasePage = './test/end-to-end/pages/CreateCase.js',
    peopleInTheCasePage = './test/end-to-end/pages/PeopleInTheCase.js',
    uploadDocuments = './test/end-to-end/pages/UploadDocuments.js',
    typeOfApplicationEvent = './test/end-to-end/pages/TypeOfApplication.js',
    attendingTheHearing = './test/end-to-end/pages/AttendingTheHearing.js',
    miam = './test/end-to-end/pages/Miam.js',
    childDetails = './test/end-to-end/pages/ChildDetails.js',
    applicantDetails = './test/end-to-end/pages/ApplicantDetails.js',
    caseName = './test/end-to-end/pages/CaseName.js',
    generalHelper = './test/end-to-end/helpers/generalHelper.js',
    hearingUrgency = './test/end-to-end/pages/HearingUrgency.js',
    litigationCapacity = './test/end-to-end/pages/LitigationCapacity.js',
    otherPeopleInTheCase = './test/end-to-end/pages/OtherPeopleInTheCase.js',
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true },
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: { mochaFile: `${testConfig.TestOutputDir}/result.xml` },
      },
      mochawesome: {
        stdout: testConfig.TestOutputDir + '/console.log',
        options: {
          reportDir: testConfig.TestOutputDir,
          reportName: 'index',
          reportTitle: 'Crossbrowser results',
          inlineAssets: true,
        },
      },
    },
  },
  multiple: {
    microsoft: {
      browsers: getBrowserConfig('microsoft'),
    },
    chrome: {
      browsers: getBrowserConfig('chrome'),
    },
    firefox: {
      browsers: getBrowserConfig('firefox'),
    },
    safari: {
      browsers: getBrowserConfig('safari'),
    },
  },
  name: 'PRL Cross-Browser Tests',
};

exports.config = setupConfig;
