const { I } = inject();
const config = require('../config');

const medWait = 20;

const normalizeCaseId = caseId => {
  return caseId.toString().replace(/\D/g, '');
};

module.exports = {

  fields: {
    jurisdiction: '#wb-jurisdiction',
    caseType: '#wb-case-type',
    caseState: '#wb-case-state',
    caseId: '//*[@id="[CASE_REFERENCE]"]',
    caseName: '#applicantCaseName',
    search: 'Apply',
    caseList: 'Case list',
    spinner: 'xuilib-loading-spinner',
    applicationType: '//*[@id="caseTypeOfApplication-C100"]',
    reset: 'Reset',
    caseNameXpath: '//*[@id="applicantCaseName"]'
  },

  navigate() {
    I.click(this.fields.caseList);
  },

  changeStateFilter(desiredState) {
    this.setInitialSearchFields(desiredState);
    I.click(this.fields.search);
  },

  async searchForCasesWithId(caseId, state = 'Any') {
    await this.setInitialSearchFields(state, caseId);
    await I.wait(medWait);
    await I.click(this.fields.search);
    await I.wait(medWait);
  },

  async setInitialSearchFields(state = 'Any', caseId) {
    // wait for initial filters to load
    // eslint-disable-next-line no-magic-numbers
    await I.waitForVisible(this.fields.jurisdiction, 60);
    await I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    await I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    await I.selectOption(this.fields.caseState, state);
    // await I.fillField(this.fields.caseNameXpath, config.definition.caseName);
    await I.fillField(this.fields.caseId, caseId);
  },

  locateCase(caseId) {
    return `a[href$='${caseId}']`;
  },

  seeCaseInSearchResult(caseId) {
    I.seeElement(this.locateCase(normalizeCaseId(caseId)));
  }

};