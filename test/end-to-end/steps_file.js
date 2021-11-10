const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const PeopleInTheCasePage = require('./pages/PeopleInTheCase');
const UploadDocuments = require('./pages/UploadDocuments');
const TypeOfApplicationEvent = require('./pages/TypeOfApplication');
const AttendingTheHearing = require('./pages/AttendingTheHearing');
const safeguardAndRiskOfHarmPage = require('./pages/safeguardingAndRiskOfHarm/safeguardingAndRiskOfHarm.js');
const generalHelper = require('./helpers/generalHelper');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    runAttendingTheHearingEvent() {
      return AttendingTheHearing.runEventHappyPathAttendingTheHearing();
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
