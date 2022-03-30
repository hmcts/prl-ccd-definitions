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

  searchForCasesWithName(caseName, state = 'Any') {
    this.setInitialSearchFields(state);
    // wait for our filters to load
    I.fillField(this.fields.caseName, caseName);
    I.click(this.fields.search);
  },

  setInitialSearchFields(state = 'Any') {
    // wait for initial filters to load
    I.wait('30');
    I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    I.selectOption(this.fields.caseState, state);
  },

  locateCase(caseId) {
    return `a[href$='${caseId}']`;
  },

  seeCaseInSearchResult(caseId) {
    I.seeElement(this.locateCase(normalizeCaseId(caseId)));
  }

};