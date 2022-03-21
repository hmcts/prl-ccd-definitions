const testConfig = require('../config/service.conf.js');
const AxeRunner = require('../helpers/axe-runner.js');
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
function generateAccessibilityReport() {
  const reportJson = AxeRunner.getAccessibilityTestResult();
  const result = `var replacejsoncontent = ${JSON.stringify(reportJson)}`;

  const sourceReport = `${__dirname}/Report.html`;
  const destReport = `${testConfig.TestOutputDir}/a11y.html`;
  const destJson = `${testConfig.TestOutputDir}/a11y_output.js`;

  fs.copyFileSync(sourceReport, destReport);
  fs.writeFileSync(destJson, result);
}