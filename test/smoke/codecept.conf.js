exports.config = {
  tests: './tests/smoke_test.js',
  output: './output',
  helpers: {
    Playwright: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: true,
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
        stdout: './smoke-output/console.log',
        options: {
          reportDir: './smoke-output',
          reportFilename: 'report'
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
