const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const PeopleInTheCasePage = require('./pages/PeopleInTheCase');
const UploadDocuments = require('./pages/UploadDocuments');
const TypeOfApplicationEvent = require('./pages/TypeOfApplication');
const GoingToCourt = require('./pages/GoingToCourt');
const safeguardAndRiskOfHarmPage = require('./pages/safeguardingAndRiskOfHarm/safeguardingAndRiskOfHarm.js');
const generalHelper = require('./helpers/generalHelper');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    runGoingToCourtEvent() {
      return GoingToCourt.runEventHappyPathGoingToCourt();
    },
    runPeopleInTheCaseEvent() {
      return PeopleInTheCasePage.runEventHappyPath();
    },
    triggerEvent(eventName) {
      return generalHelper.triggerEvent(eventName);
    },
    createCase() {
      return CreateCasePage.createNewCase();
    },
    uploadDocuments() {
      return UploadDocuments.uploadDocuments();
    },
    safeguardingAndRiskOfHarm() {
      return safeguardAndRiskOfHarmPage.safeguardAndRiskOfHarmEvent();
    },
    typeOfApplicationEvent() {
      return TypeOfApplicationEvent.typeOfApplicationEvent();
    }
  });
};
