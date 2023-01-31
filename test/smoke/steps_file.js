const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const generalHelper = require('./helpers/generalHelper');
const payment = require('./pages/PaymentCA');
const caseList = require('./pages/CaseList');
const logOut = require('./pages/Logout');
const SendAndReplyMessages = require('./pages/SendAndReplyMessages');
const SoT = require('./pages/DOScreens/StatementOfTruth');
const AddCaseNumber = require('./pages/AddCaseNumber');
const SendToGateKeeper = require('./pages/SendToGateKeeper');
const ManageOrdersUpload = require('./pages/ManageOrders');
const ServiceOfApplication = require('./pages/ServiceOfApplication');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    loginAsCourtAdminUserOne() {
      return LoginPage.loginAsCourtAdminUserOne();
    },
    loginAsCourtAdminUserTwo() {
      return LoginPage.loginAsCourtAdminUserTwo();
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
    triggerEvent(eventName) {
      return generalHelper.triggerEvent(eventName);
    },
    seeCaseInSearchResult(caseID) {
      return caseList.seeCaseInSearchResult(caseID);
    },
    paymentCA() {
      return payment.payByCard();
    },
    logOut() {
      return logOut.clickSignOut();
    },
    statementOfTruth() {
      return SoT.submitStatementOfTruth();
    },
    sendMessage() {
      return SendAndReplyMessages.sendMessage();
    },
    addCaseNumber() {
      return AddCaseNumber.AddingCaseNumber();
    },
    addNewGateKeeper() {
      return SendToGateKeeper.AddNewGateKeeper();
    },
    runEventHappyPath() {
      return ManageOrdersUpload.runEventHappyPath();
    },
    runServiceApplication() {
      return ServiceOfApplication .runServiceApplication() 
    }
  });
};
