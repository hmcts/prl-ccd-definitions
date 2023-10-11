exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: true,
      url: 'http://localhost:3000',
      waitForTimeout: 60000,
      getPageTimeout: 60000,
      waitForAction: 1000,
      waitForNavigation: 'domcontentloaded',
      chrome: {
        ignoreHTTPSErrors: true,
        args: [ '--disable-gpu', '--no-sandbox', '--allow-running-insecure-content', '--ignore-certificate-errors']
      },
      windowSize: '1280x960'
    },
    PlaywrightHelpers: { require: './helpers/playwrightHelper.js' },
    GenerateReportHelper: { require: './helpers/generateReportHelper.js' },
    GeneralHelper: { require: './helpers/generalHelper.js' }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
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
        stdout: './functional-output/console.log',
        options: {
          includeScreenshots: true,
          reportDir: './functional-output',
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
      chunks: 2,
      browsers: ['chrome']
    }
  },
  name: 'prl-ccd-definitions'
};
