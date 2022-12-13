const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const generalHelper = require('./helpers/generalHelper');

const caseList = require('./pages/CaseList');

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
   /* createCaseAndReturnID() {
      return CreateCasePage.createNewCaseC100andReturnID();
    },
    searchForCasesWithId(caseId) {
      return caseList.searchForCasesWithId(caseId, 'Any');
    },
    navigateToCaseList() {
      return caseList.navigate();
    },
    triggerEvent(eventName) {
      return generalHelper.triggerEvent(eventName);
    },
    seeCaseInSearchResult(caseID) {
      return caseList.seeCaseInSearchResult(caseID);
    }*/
  });
};
