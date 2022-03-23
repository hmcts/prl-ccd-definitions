const fs = require('fs');
const AxePuppeteer = require('@axe-core/puppeteer');
const serviceConfig = require('../config/service.conf');
const CustomHelper = require('./customHelper');
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
let customHelper = new CustomHelper();
const delay = ms => new Promise(res => setTimeout(res, ms));
module.exports = {
    async runAndReportAccessibility() {
        await delay(5000);
        //const screenshotPath = `${serviceConfig.TestOutputDir}`;
        //const screenshotName = `${Date.now()}.png`;
        //const screenshotReportRef = `../${screenshotName}`;
        //const currentPageRes = customHelper.getCurrentPage();
        const handleCurrentPage = async (currentPage) => {
            return await currentPage.screenshot({ path: 'cool.png', fullPage: true });
        }
        const handleURLPage = async (currentPage) => {
          return await currentPage.url;
        }
        await customHelper.getCurrentPage().then((currentPage) => {
            // eslint-disable-next-line no-undef
            currentPage.screenshot({ path: 'cool.png', fullPage: true });
            handleURLPage(currentPage).then((URL)=>{
              console.log('check if screenshot generated now...' + URL);
            })
            const accessibilityErrorsOnThePage = new AxePuppeteer.AxePuppeteer(currentPage)
                .withTags(['wcag2a', 'wcag2aa'])
                .analyze();
            // eslint-disable-next-line no-undef
            console.log("generating screeshot");
            handleCurrentPage(currentPage).then(() => {
                console.log('check if screenshot generated now...');
                const processIssue = function (issue) {
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
            })
        })
    },
    getAccessibilityTestResult() {
        return resultObj;
    }
};