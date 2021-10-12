const lodash = require('lodash');

exports.config = {
  tests: './tests/*.js',
  output: './output',
  multiple: {
    parallel: {
      chunks: files => {
        const splitFiles = (list, size) => {
          const sets = [];
          const chunks = list.length / size;
          let i = 0;

          while (i < chunks) {
            sets[i] = list.splice(0, size);
            // eslint-disable-next-line no-plusplus
            i++;
          }
          return sets;
        };

        const buckets = parseInt(process.env.PARALLEL_CHUNKS || '5');
        const slowTests = lodash.filter(files, file => file.includes('@slow'));
        const otherTests = lodash.difference(files, slowTests);

        let chunks = [];
        if (buckets > slowTests.length + 1) {
          const slowTestChunkSize = 1;
          const regularChunkSize = Math.ceil((files.length - slowTests.length) / (buckets - slowTests.length));
          chunks = lodash.union(splitFiles(slowTests, slowTestChunkSize), splitFiles(otherTests, regularChunkSize));
        } else {
          chunks = splitFiles(files, Math.ceil(files.length / buckets));
        }

        console.log(chunks);

        return chunks;
      }
    }
  },
  helpers: {
    Puppeteer: {
      // headless mode
      restart: false,
      show: process.env.SHOW_BROWSER_WINDOW || false,
      url: 'http://localhost:3000',
      waitForNavigation: ['load', 'domcontentloaded', 'networkidle0'],
      waitForTimeout: 90000,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: process.env.DISABLE_WEB_SECURITY === 'true' ? ['--disable-web-security'] : []
      },
      windowSize: '1280x960'
    },
    GeneralHelper: { require: './helpers/generalHelper.js' }
  },
  include: { I: './steps_file.js' },
  bootstrap: null,
  mocha: {},
  name: 'fprl-ccd-definitions'
};
