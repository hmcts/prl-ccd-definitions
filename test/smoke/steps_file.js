const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const caseList = require('./pages/CaseList');
const casePage = require('./pages/Case');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    createCase() {
      return CreateCasePage.createNewCaseC100();
    },
    createCaseFL401() {
      return CreateCasePage.createNewCaseFL401();
    },
    createCaseAndReturnID() {
      return CreateCasePage.createNewCaseC100andReturnID();
    },
    searchForCasesWithId(caseId) {
      return caseList.searchForCasesWithId(caseId, 'Any');
    },
    navigateToCaseList() {
      return caseList.navigate();
    },
    seeCaseInSearchResult(caseID) {
      return caseList.seeCaseInSearchResult(caseID);
    },
    loadCase(caseId) {
      return casePage.loadCase(caseId);
    },
    searchForCaseId(caseId) {
      return casePage.searchForCaseId(caseId);
    }
  });
};
