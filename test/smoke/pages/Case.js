const { I } = inject();
const config = require('../config');

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
  }
};