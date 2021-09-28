const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const PeopleInTheCasePage = require('./pages/PeopleInTheCase');
const UploadDocuments = require('./pages/UploadDocuments');
const typeOfApplicationEvent = require('./pages/TypeOfApplication');
const { goingToCourtSelectNoForAll, goingToCourtSelectYesForAll } = require('./pages/going-to-court/goint-to-court');
const generalHelper = require('./helpers/generalHelper');
const safeguardAndRiskOfHarmPage = require('./pages/safeguardingAndRiskOfHarm/safeguardingAndRiskOfHarm.js');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    goingToCourtSelectNoForAll,
    goingToCourtSelectYesForAll,
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
      return typeOfApplicationEvent.typeOfApplicationEvent();
    }
  });
};
