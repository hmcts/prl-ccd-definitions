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
    caseId: 'CCD Case Number',
    caseName: '#applicantCaseName',
    search: 'Apply',
    caseList: 'Case list',
    spinner: 'xuilib-loading-spinner'
    caseNumber: 'CCD number'
  },

  navigate() {
    I.click(this.fields.caseList);
  },

  changeStateFilter(desiredState) {
    this.setInitialSearchFields(desiredState);
    I.click(this.fields.search);
  },

  searchForCasesWithId(caseId, state = 'Any') {
    this.setInitialSearchFields(state);
    I.grabCurrentUrl();
    I.fillField(this.fields.caseId, caseId);
    I.grabCurrentUrl();
    I.click(this.fields.search);
    I.grabCurrentUrl();
  },

  searchForCasesWithName(caseName, state = 'Any',caseId) {
    this.setInitialSearchFields(state,caseId);
    // wait for our filters to load
    I.fillField(this.fields.caseName, caseName);
    I.click(this.fields.search);
  },

  setInitialSearchFields(state = 'Any',caseId) {
    // wait for initial filters to load
    // eslint-disable-next-line no-magic-numbers
    I.waitForVisible(this.fields.jurisdiction, 30);
    I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    I.selectOption(this.fields.caseState, state);
    I.selectOption(this.fields.caseNumber , caseId);
  },

  locateCase(caseId) {
    return `a[href$='${caseId}']`;
  },

  seeCaseInSearchResult(caseId) {
    I.seeElement(this.locateCase(normalizeCaseId(caseId)));
  }

};