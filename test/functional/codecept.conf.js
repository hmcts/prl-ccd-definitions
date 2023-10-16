exports.config = {
  tests: './*_test.js',
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
    }
  },
  include: { I: './steps_file.js' },
  bootstrap: null,
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
      minTimeout: 2000
    }
  },
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
        stdout: './functional-output/console.log',
        options: {
          reportDir: './functional-output',
          reportFilename: 'report'
        }
      },
      'mocha-junit-reporter': {
        stdout: './functional-output/console.log',
        options: {
          mochaFile: './functional-output/result.xml',
          attachments: 'true'
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
