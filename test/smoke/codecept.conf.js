
const path = require('path');

const outputDir = path.resolve(__dirname, '../../output');

exports.config = {
  tests: './tests/smoke_test.js',
  output: outputDir,
  helpers: {
    Playwright: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: true,
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
    GeneralHelper: { require: './helpers/generalHelper.js' }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 3,
      minTimeout: 2000
    }
  },
  include: { I: './steps_file.js' },
  bootstrap: null,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: {
          verbose: true,
          steps: true
        }
      },
      mochawesome: {
        stdout: `${outputDir}/console.log`,
        options: {
          includeScreenshots: true,
          reportDir: outputDir,
          reportFilename: 'PrL-CCD-Callbacks-smoke-tests',
          reportTitle: 'PrL CCD Callbacks smoke Tests',
          inline: true,
          html: true,
          json: true
        }
      },
      'mocha-junit-reporter': {
        stdout: './smoke-output/console.log',
        options: {
          mochaFile: './smoke-output/result.xml',
          attachments: 'true //add screenshot for a failed test'
        }
      }
    }
  },
  name: 'prl-ccd-definitions'
};
