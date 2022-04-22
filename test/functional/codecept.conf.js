exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      chrome: { ignoreHTTPSErrors: true }
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
  name: 'prl-ccd-definitions'
};
