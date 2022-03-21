const fs = require('fs');
const AxeBuilder = require('@axe-core/webdriverjs');
const serviceConfig = require('../config/service.conf');

const result = {
  PASSED: 'passed',
  FAILED: 'failed'
};

const resultObj = {
  appName: 'Manage cases',
  passCount: 0,
  failCount: 0,
  tests: []
};

module.exports = {
  async runAndReportAccessibility() {
    const screenshotPath = `${serviceConfig.TestOutputDir}`;
    const screenshotName = `${Date.now()}.png`;
    const screenshotReportRef = `e2e/${screenshotName}`;

    // eslint-disable-next-line no-undef
    const accessibilityErrorsOnThePage = await new AxeBuilder(browser.driver)
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // eslint-disable-next-line no-undef
    await browser.takeScreenshot()
      .then(async screenShot => {
        if (!await fs.existsSync(screenshotPath)) {
          // eslint-disable-next-line id-blacklist
          fs.mkdirSync(screenshotPath, { recursive: true });
        }
        // eslint-disable-next-line id-blacklist
        fs.writeFile(`${screenshotPath}/${screenshotName}`, screenShot, 'base64', err => {
        // eslint-disable-next-line id-blacklist
          if (err) {
            console.log('Failed to copy the screenshot', err);
          }
        });
      });

    const processIssue = function(issue) {
      return {
        code: issue.id,
        type: issue.impact,
        message: issue.description,
        helpurl: issue.helpUrl,
        tags: issue.tags,
        runner: 'axe'
      };
    };
    const violations = accessibilityErrorsOnThePage.violations.map(processIssue);
    const isPageAccessible = violations.length === 0 ? result.PASSED : result.FAILED;

    const urlArr = accessibilityErrorsOnThePage.url.split('/');
    const i = 1;
    if (isPageAccessible === result.PASSED) {
      resultObj.passCount += i;
    } else {
      resultObj.failCount += i;
    }

    resultObj.tests.push({
      // eslint-disable-next-line no-magic-numbers
      name: `${urlArr[urlArr.length - 2]}/${urlArr[urlArr.length - 1]}`,
      pageUrl: accessibilityErrorsOnThePage.url,
      status: isPageAccessible,
      screenshot: screenshotReportRef,
      a11yIssues: violations
    });
  },

  getAccessibilityTestResult() {
    return resultObj;
  }
};
