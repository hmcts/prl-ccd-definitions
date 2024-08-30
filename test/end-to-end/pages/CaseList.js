/* eslint-disable no-undef */
const { I } = inject();
const config = require('../config');
const { expect } = require('chai');
const testLogger = require('../helpers/testLogger');

const retryCount = 3;
const totSearchResults = 25;

const normalizeCaseId = caseId => {
  return caseId.toString().replace(/\D/g, '');
};

module.exports = {

  fields: {
    jurisdiction: '#wb-jurisdiction',
    caseType: '#wb-case-type',
    caseState: '#wb-case-state',
    caseId: '//input[@id="[CASE_REFERENCE]"]',
    caseName: '#applicantCaseName',
    applicationType: '#caseTypeOfApplication-C100',
    search: 'Apply',
    caseList: 'Case list',
    CaseListTab: '//a[contains(text(),"Case list")]',
    spinner: 'xuilib-loading-spinner',
    listofcourts: 'select[id="courtList"]',
    searchResult: '//a/ccd-field-read/div/ccd-field-read-label/div/ccd-read-text-field/span',
    stateSearchResults: '//*[@id="search-result"]/ccd-search-result/table/tbody/tr/td[4]/div/ccd-field-read/div/ccd-field-read-label',
    typeSearchResults: '//*[@id="search-result"]/ccd-search-result/table/tbody/tr/td[3]/div/ccd-field-read/div/ccd-field-read-label'
  },

  async navigate() {
    await I.waitForElement(this.fields.CaseListTab);
    await I.click(this.fields.CaseListTab);
  },

  async changeStateFilter(desiredState) {
    this.setInitialSearchFields(desiredState);
    await I.waitForElement(this.fields.search);
    I.click(this.fields.search);
  },

  async searchForCasesWithId(caseId, state = 'Any') {
    global.logCallingFunction();
    testLogger.AddMessage(`Search for case: ${caseId}`);
    // let caseidInViewCaseList = caseId.match(/.{1,4}/g);
    // caseidInViewCaseList = caseidInViewCaseList.join('-');
    await I.wait('5');
    await I.retry(retryCount).navigationInWAEnvs(this.fields.caseList);
    await I.wait('5');
    await I.waitForText(this.fields.caseList);
    await await I.click(this.fields.caseList);
    await I.waitForText('Filters');

    // eslint-disable-next-line no-unused-vars

    this.setInitialSearchFields(state);
    await I.grabCurrentUrl();
    await I.wait('3');
    await I.fillField(this.fields.caseId, caseId);
    await I.grabCurrentUrl();
    await I.wait('3');
    await I.click(this.fields.search);
    await I.grabCurrentUrl();
    await I.waitForElement(`a[href*='/cases/case-details/${caseId}']`);
    // await I.waitForElement(this.fields.searchResult);
    await I.wait('3');
    await I.retry(retryCount).click(`a[href*='/cases/case-details/${caseId}']`);
    await I.waitForElement('ccd-case-viewer');
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
  },

  locateCase(caseId) {
    return `a[href$='${caseId}']`;
  },

  seeCaseInSearchResult(caseId) {
    I.seeElement(this.locateCase(normalizeCaseId(caseId)));
  },

  async issueAndSendToLocalCourt() {
    await I.wait('3');
    await I.refreshPage();
    await I.retry(retryCount).click('Assign to me');
    await I.wait('5');
    await I.retry(retryCount).waitForText('Issue and send to local Court');
    await I.retry(retryCount).triggerEvent('Issue and send to local court');
    await I.wait('5');
    await I.waitForElement(this.fields.listofcourts);
    await I.retry(retryCount).selectOption(this.fields.listofcourts, 'Aberystwyth Justice Centre - Trefechan - SY23 1AS');
    await I.retry(retryCount).continueEvent();
    await I.wait('2');
    await I.retry(retryCount).click('Submit');
    await I.wait('5');
    await I.retry(retryCount).amOnHistoryPageWithSuccessNotification();
  },

  async searchForCaseAndOpenCase() {
    await I.wait('15');
    await I.retry(retryCount).click('//a[@class=\'govuk-link ng-star-inserted\']');
    await I.wait('10');
  },

  async searchForCaseWithoutId() {
    await I.waitForVisible(this.fields.jurisdiction, '30');
    await I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    await I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    await I.selectOption(this.fields.caseState, config.definition.caseState);
    await I.click(this.fields.search);
  },

  async additionFilteringByApplicationType() {
    await I.click(this.fields.applicationType);
    await I.click(this.fields.search);
    await I.wait('10');
  },

  async verifySearchResultsFilteredByState() {
    let stateResults = [];
    await I.waitNumberOfVisibleElements(this.fields.stateSearchResults, totSearchResults);
    await I.wait('20');

    stateResults = await I.grabTextFromAll(this.fields.stateSearchResults);
    stateResults.forEach(entry => {
      expect(entry).to.equal(config.definition.caseState);
    });
  },

  async verifySearchResultsFilteredByStateAndApplicationType() {
    let stateResults = [], typeResults = [];
    await I.waitNumberOfVisibleElements(this.fields.stateSearchResults, totSearchResults);
    await I.wait('20');

    stateResults = await I.grabTextFromAll(this.fields.stateSearchResults);
    stateResults.forEach(entry => {
      expect(entry).to.equal(config.definition.caseState);
    });

    typeResults = await I.grabTextFromAll(this.fields.typeSearchResults);
    typeResults.forEach(entry => {
      expect(entry).to.equal(config.definition.applicationType);
    });
  },

  async searchForInvalidCase() {
    await I.waitForVisible(this.fields.jurisdiction, '30');
    await I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    await I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    await I.selectOption(this.fields.caseState, config.definition.caseState);
    await I.fillField(this.fields.caseId, '12345678');
    await I.click(this.fields.search);
  },

  async verifyInvalidSearchResults() {
    await I.waitNumberOfVisibleElements(this.fields.stateSearchResults, 0);
    await I.see('No cases found. Try using different filters.');
  }

};