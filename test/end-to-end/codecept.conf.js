exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      // headless mode
      show: true,
      url: 'http://localhost:3000',
      waitForNavigation: ['domcontentloaded'],
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: [
          '--no-sandbox',
          '--start-fullscreen'
        ]
      }
    }
  },
  include: { I: './steps_file.js' },
  bootstrap: null,
  mocha: {},
  name: 'fprl-ccd-definitions'
};
