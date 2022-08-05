//const defaultPassword = 'Testing1234';

module.exports = {
  legalProfessionalUserOne: {
    email: 'testways2payuser4@mailnesia.com',
    emailCourtAdmin: 'prl_caseworker_courtadmin@mailinator.com',
    password1: 'Testing1234',
    password2: 'Nagoya0102'
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications'
  },

  baseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false
};
