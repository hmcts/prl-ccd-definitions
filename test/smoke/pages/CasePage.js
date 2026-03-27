const { I } = inject();
const config = require('../config');

const INITIAL_WAIT = 15;

module.exports = {
  async loadCase(caseId) {
    const pageUrl = `${config.baseUrl}`
      .concat('/case-details')
      .concat('/')
      .concat(config.definition.jurisdiction)
      .concat('/')
      .concat(config.definition.caseType)
      .concat(caseId);
    await I.amOnPage(pageUrl);
  },

  async searchForCaseId(caseId) {
    const formattedCaseId = caseId.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
    await I.waitForText(formattedCaseId, INITIAL_WAIT);
    await I.see(formattedCaseId);
  }
};