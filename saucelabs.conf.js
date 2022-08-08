const testConfig = require('./test/end-to-end/config.js');
const supportedBrowsers = require('./test/end-to-end/crossbrowser/supportedBrowsers.js');
const waitForTimeout = parseInt(process.env.WAIT_FOR_TIMEOUT) || 50000;
const smartWait = parseInt(process.env.SMART_WAIT) || 50000;
const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const defaultSauceOptions = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  tunnelIdentifier: process.env.TUNNEL_IDENTIFIER || 'reformtunnel',
  acceptSslCerts: true,
  tags: ['Private Law'],
  maxDuration: 5000,
  commandTimeout: 600,

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
  output: `${process.cwd()}/${testConfig.TestOutputDir}`,
  helpers: {
    Puppeteer: {
      // headless mode
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: true,
      url: 'http://localhost:3000',
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      waitForTimeout: 180000,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox']
      },
      windowSize: '1280x960'
    },
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
    GeneralHelper: {
      require: './test/end-to-end/helpers/generalHelper.js',
    },
    PuppeteerHelpers: {
      require: './test/end-to-end/helpers/puppeterHelper.js',
    },
    GenerateReportHelper: {
      require: './test/end-to-end/helpers/generateReportHelper.js'
    },
    Mochawesome: {
      uniqueScreenshotNames: true,
    },
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
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
  include: {
    I: './test/end-to-end/steps_file.js',
    config: './test/end-to-end/config.js',
    loginPage: './test/end-to-end/pages/Login.js',
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
    // safari: {
    //   browsers: getBrowserConfig('safari'),
    // },
  },
  name: 'PRL Cross-Browser Tests',
};

exports.config = setupConfig;
