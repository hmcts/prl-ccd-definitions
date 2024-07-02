
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const dataSetupRequestJson = require('./dataSetupRequest.json');
const CaseDataSetupV2 = require('./CaseDataSetupV2');

class DataSetupManager {
  constructor() {
    this.dataSetupList = [];
    this.dataSetupRefFilesPath = path.resolve(__dirname, '../../../output/caseDataSetup');
    if (!fs.existsSync(this.dataSetupRefFilesPath)) {
      fs.mkdirSync(this.dataSetupRefFilesPath);
    }

    this.state = 'running';
  }

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.run();
  }

  async close() {
    this.state = 'close';
    await this.browser.close();
  }

  run() {
    for (const request of dataSetupRequestJson) {
      const caseDataSetup = new CaseDataSetupV2(this.browser);
      this.dataSetupList.push({
        scenario: request.scenario,
        datasetupObj: caseDataSetup
      });
      caseDataSetup.state = 'running';
      caseDataSetup.caseSetupToServiceOfApplication().then(() => {
        caseDataSetup.state = 'completed';
      })
        .catch(setupErr => {
          console.log(setupErr);
          caseDataSetup.state = 'failed';
        });
      console.log('text');
    }
  }

  getDataSetupForScenario(scenarioName) {
    return this.dataSetupList.find(scr => {
      return scr.scenario === scenarioName;
    }).datasetupObj;
  }
}

module.exports = new DataSetupManager();
