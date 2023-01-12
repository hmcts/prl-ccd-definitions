const defaultPassword = 'Nagoya0102';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl_aat_solicitor@mailinator.com',
    password: defaultPassword
  },
  
  testCourtAdminUserOne: {
    email: 'fprl_caseworker_courtadm_test@mailinator.com',
    password: defaultPassword
  },
  
  testCourtAdminUserTwo: {
    email: 'prl_aat_caseworker_courtadmin@mailinator.com',
    password: defaultPassword
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
