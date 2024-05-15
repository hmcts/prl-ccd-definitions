global.logCallingFunction = () => {
  const errorObj = new Error();
  const frame = errorObj.stack.split('\n')[2];
  const lineNumber = frame.split(':').reverse()[1];
  let functionName = frame.split(' ')[5];
  // const atFile = frame.split(' ')[6];

  if (functionName.includes('/')) {
    functionName = functionName.split('/').reverse()[0];
  }
  functionName += `: ${lineNumber}`;
  console.log(`==> ${frame}`);
};

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      show: process.env.SHOW_BROWSER_WINDOW || false,
      // show: false,
      url: process.env.URL ? process.env.URL : 'http://localhost:3000',
      waitForTimeout: 60000,
      getPageTimeout: 60000,
      waitForAction: 1000,
      waitForNavigation: 'domcontentloaded',
      chrome: {
        ignoreHTTPSErrors: true,
        args: [ '--disable-gpu', '--no-sandbox', '--allow-running-insecure-content', '--ignore-certificate-errors']
      },
      windowSize: '1280x960',
      disableScreenshots: false,
      video: true,
      keepVideoForPassedTests: false,
      keepTraceForPassedTests: false,
      fullPageScreenshots: true,
      uniqueScreenshotNames: true

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
    },
    autoDelay: { enabled: true },
    screenshotOnFail: {
      fullPageScreenshots: true,
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
        stdout: './output/console.log',
        options: {
          includeScreenshots: true,
          reportDir: './output',
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
  name: 'prl-ccd-definitions'
};
