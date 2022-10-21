const { I } = inject();
const config = require('../config');

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

  searchForCasesWithId(caseId, state = 'Any') {
    I.click(this.fields.reset);
    this.setInitialSearchFields(state);
    I.fillField(this.fields.caseId, caseId);
    I.click(this.fields.applicationType);
    I.click(this.fields.search);
  },

  searchForCasesWithName(caseName, state = 'Any') {
    this.setInitialSearchFields(state);
    // wait for our filters to load
    I.fillField(this.fields.caseName, caseName);
    I.click(this.fields.search);
  },

  setInitialSearchFields(state = 'Any') {
    // wait for initial filters to load
    // eslint-disable-next-line no-magic-numbers
    I.waitForVisible(this.fields.jurisdiction, 30);
    I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    I.selectOption(this.fields.caseState, state);
    I.fillField(this.fields.caseNameXpath, config.definition.caseName);
  },

  locateCase(caseId) {
    return `a[href$='${caseId}']`;
  },

  seeCaseInSearchResult(caseId) {
    I.seeElement(this.locateCase(normalizeCaseId(caseId)));
  }

};