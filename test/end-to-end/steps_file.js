const CreateCasePage = require('./pages/CreateCase');
const LoginPage = require('./pages/Login');
const ChildDetails = require('./pages/ChildDetails');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    triggerEvent(eventName) {
      return generalHelper.triggerEvent(eventName);
    },
    createCase() {
      return CreateCasePage.createNewCase();
    },
    childDetails() {
      return ChildDetails.runChildDetailsEventHappyPath();
    }
  });
};
