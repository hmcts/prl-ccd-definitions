// const logCustomization = require('./helpers/logCustomization')
// logCustomization.overrideConsoleLogforWorkersThreads();
const path = require('path');
const fs = require('fs');

const outputDir = path.resolve(__dirname, '../../output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const DataSetupManager = require('./restApiData/DataSetupManager');


exports.config = {
  tests: './tests/*_test.js',
  output: outputDir,
  helpers: {
    Playwright: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: false,
      url: process.env.URL ? process.env.URL : 'http://localhost:3000',
      waitForTimeout: 80000,
      getPageTimeout: 80000,
      waitForAction: 4000,
      waitForNavigation: 'domcontentloaded',
      chrome: {
        ignoreHTTPSErrors: true,
        args: [ '--disable-gpu', '--no-sandbox', '--allow-running-insecure-content', '--ignore-certificate-errors']
      },
      windowSize: '1280x960',
      disableScreenshots: false,
      video: true,
      recordVideo: { dir: outputDir },
      keepVideoForPassedTests: false,
      keepTraceForPassedTests: false,
      fullPageScreenshots: true,
      uniqueScreenshotNames: true

    },
    PlaywrightHelpers: { require: './helpers/playwrightHelper.js' },
    GenerateReportHelper: { require: './helpers/generateReportHelper.js' },
    GeneralHelper: { require: './helpers/generalHelper.js' },
    Mochawesome: { uniqueScreenshotNames: true, disableScreenshots: false }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    },
    retryTo: { enabled: true },
    autoDelay: { enabled: true },
    screenshotOnFail: {
      fullPageScreenshots: true,
      enabled: true
    },
    hooksPlugin: {
      require: './helpers/hooks.js',
      enabled: true
    }
  },
  include: { I: './steps_file.js' },
  // bootstrap: null,
  mocha: {
    reporterEnabled: 'codeceptjs-cli-reporter, mochawesome',
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: false,
          steps: true
        }
      },
      mochawesome: {
        stdout: `${outputDir}/console.log`,
        options: {
          includeScreenshots: true,
          reportDir: outputDir,
          reportFilename: 'PrL-CCD-Callbacks-tests',
          reportTitle: 'PrL CCD Callbacks Tests',
          inline: true,
          html: true,
          json: true
        }
      }
    }
  },
  multiple: {
    parallel: {
      chunks: 6,
      browsers: ['chrome']
    }
  },
  name: 'prl-ccd-definitions',
  bootstrap: () => {
    DataSetupManager.init();
  },

  teardown: async() => {
    await DataSetupManager.close();
  }
};
