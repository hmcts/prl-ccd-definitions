const { I } = inject();
const config = require('../config');

const INITIAL_WAIT = 15;

const formatCaseId = caseId => {
  return caseId.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
};

module.exports = {
  async loadCase(caseId) {
    const { baseUrl, definition } = config;
    const { jurisdiction, caseType } = definition;

    const pageUrl = `${baseUrl}/case-details/${jurisdiction}/${caseType}/${caseId}`;
    await I.amOnPage(pageUrl);
  },

  async searchForCaseId(caseId) {
    const formattedCaseId = formatCaseId(caseId);
    await I.waitForText(formattedCaseId, INITIAL_WAIT);
    await I.see(formattedCaseId);
  }
};