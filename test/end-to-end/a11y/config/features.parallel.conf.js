const _ = require('lodash');
const glob = require('glob');
const argv = require('yargs').argv;
const retry = require('protractor-retry').retry;
const {
  PickleFilter,
  getTestCasesFromFilesystem
} = require('cucumber');
const { EventEmitter } = require('events');

const eventBroadcaster = new EventEmitter();

const puppeteer = require('puppeteer');
const serviceConfig = require('./service.conf');
const tsNode = require('ts-node');
const path = require('path');
const { generateAccessibilityReport } = require('../reporter/customReporter');


const capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-sandbox',
      serviceConfig.UseHeadlessBrowser ? '--headless' : '--noop',
      serviceConfig.UseHeadlessBrowser ? '--window-size=1920,1080' : '--noop'
    ],
    binary: puppeteer.executablePath()
  },
  acceptInsecureCerts: true,
  maxInstances: serviceConfig.RunWithNumberOfBrowsers,
  loggingPrefs: {
    driver: 'INFO',
    browser: 'INFO'
  },
  shardTestFiles: (serviceConfig.RunWithNumberOfBrowsers > 1)
};

class BaseConfig {
  constructor() {
    this.baseUrl = serviceConfig.CcdWebUrl;
    this.allScriptsTimeout = 120000;
    this.getPageTimeout = 120000;

    if (argv.parallelFeatures || argv.parallelScenarios) {
      this.maxSessions = parseInt(serviceConfig.RunWithNumberOfBrowsers, 10);
      this.getMultiCapabilities = () => {
        return this.getFeaturesByTagExpression().then(results => {
          let files = null;
          const listOfRun = 1;
          console.log(`List of tests to run : ${JSON.stringify(results, null, listOfRun)}`);
          if (argv.parallelFeatures) {
            files = results.features;
          } else {
            files = results.scenarios;
          }
          // eslint-disable-next-line no-unused-vars
          return _.map(files, (file, i) => {
            const featureFile = file.replace(/^e2e/, '.');
            const config = {
              specs: featureFile,
              shardTestFiles: true,
              maxInstances: 1
            };
            return _.merge(config, capabilities);
          });
        });
      };
    } else {
      this.specs = '../features/*.feature';
      this.capabilities = capabilities;
    }

    this.disableChecks = true;
    this.ignoreUncaughtExceptions = true;
    this.directConnect = true;
    this.useAllAngular2AppRoots = true;

    // this causes issues with test failing
    // so do not enable it unless all tests pass
    // on a variety of environments first :)
    this.restartBrowserBetweenTests = false;

    this.framework = 'custom';
    this.frameworkPath = require.resolve('protractor-cucumber-framework');

    this.cucumberOpts = {
      format: ['node_modules/cucumber-pretty', 'json:reports/tests/functionTestResult.json'],
      require: [
        './cucumber.conf.js',
        './features/step_definitions/*.steps.ts',
        './support/hooks.js'
      ],
      keepAlive: false,
      tags: false,
      profile: false,
      'fail-fast': serviceConfig.FailFast,
      'nightly-tag': serviceConfig.NightlyTag,
      'no-source': true
    };

    this.plugins = [
      {
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
          automaticallyGenerateReport: true,
          removeExistingJsonReportFile: true,
          reportName: 'PRIVATELAW CCD E2E Tests',
          jsonDir: 'reports/tests/functional',
          reportPath: 'reports/tests/functional'
        }
      }
    ];

    this.onCleanUp = results => {
      retry.onCleanUp(results);
    };

    this.onPrepare = () => {
      // returning the promise makes protractor wait for
      // the reporter config before executing tests
      // eslint-disable-next-line object-curly-newline
      global
        .browser
        .getProcessedConfig()
        // eslint-disable-next-line object-curly-newline
        .then({
          // eslint-disable-next-line object-curly-newline
        });

      tsNode.register({ project: path.join(__dirname, './tsconfig.e2e.json') });

      retry.onPrepare();
    };

    this.afterLaunch = () => {
      const afterLaunchNum = 2;
      return retry.afterLaunch(afterLaunchNum);
    };

    this.onComplete = () => {
      generateAccessibilityReport();
    };

    this.plugins = [
      {
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
          automaticallyGenerateReport: true,
          removeExistingJsonReportFile: true,
          reportName: 'PRIVATELAW ExUI E2E Tests',
          jsonDir: 'reports/tests/functional',
          reportPath: 'reports/tests/functional'
        }
      }
    ];
  }

  /*
   * Returns all feature files that match pattern
   */
  getFeatures() {
    const filesGlob = 'test/end-to-end/a11y/features/**/*.feature';
    const files = glob.sync(filesGlob);
    return _.sortedUniq(files);
  }

  /*
   * Use cucumber built in methods
   * to filter features based on expression
   */
  getFeaturesByTagExpression() {
    return getTestCasesFromFilesystem({
      cwd: '',
      eventBroadcaster,
      featurePaths: this.getFeatures(),
      pickleFilter: new PickleFilter({ tagExpression: this.getCucumberCliTags() }),
      order: 'defined'
    }).then(results => {
      const features = [];
      const scenarios = [];
      _.forEach(results, result => {
        if (argv.parallelFeatures) {
          features.push(result.uri);
        } else {
          const lineNumber = result.pickle.locations[0].line;
          const uri = result.uri;
          const scenario = `${uri}:${lineNumber}`;
          scenarios.push(scenario);
        }
      });

      return {
        features: _.sortedUniq(features),
        scenarios
      };
    });
  }

  getCucumberCliTags() {
    const cucumberOptsTags = _.get(argv, 'cucumberOpts.tags');
    if (typeof cucumberOptsTags === 'string' || cucumberOptsTags instanceof String) {
      console.log(`cucumber opts tags : ${cucumberOptsTags}`);
      return cucumberOptsTags;
    }
    console.log(`cucumber opts tags : ${cucumberOptsTags}`);
    return cucumberOptsTags.join(' or ') || '';
  }
}

exports.config = new BaseConfig();
