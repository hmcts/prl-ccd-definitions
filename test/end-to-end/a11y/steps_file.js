const SinginPage = require('./pages/AccessibilityTesting');

module.exports = () => {
  return actor({
    goToSignInPage() {
      return SinginPage.goToSignInPage();
    },
    signInAsCaseWorker() {
      return SinginPage.signInAsCaseWorker();
    }
  });
};
