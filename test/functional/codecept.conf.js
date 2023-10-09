exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      chrome: { ignoreHTTPSErrors: true },
      show: true
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
