exports.config = {
  tests: './tests/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      // headless mode
      show: process.env.SHOW_BROWSER_WINDOW || false,
      url: 'http://localhost:3000',
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      waitForTimeout: 90000,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox']
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
  mocha: {},
  name: 'prl-ccd-definitions'
};
