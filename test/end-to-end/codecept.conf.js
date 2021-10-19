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
        args: [
          '--no-sandbox'
        ]
      }
    },
    GeneralHelper: { require: './helpers/generalHelper.js' }
  },
  include: { I: './steps_file.js' },
  bootstrap: null,
  mocha: {},
  name: 'fprl-ccd-definitions'
};
