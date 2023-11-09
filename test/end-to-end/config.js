const defaultPassword = 'Nagoya0102';
const judgeDefaultPassword = 'Hmcts1234';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl-e2etestsolicitor@mailinator.com',
    password: defaultPassword
  },
  legalProfessionalUserTwo: {
    email: process.env.COURTADMIN_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  respondentSolicitor: {
    email: process.env.LEGALPROFESSIONAL_RESPONDENT_TESTUSER,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  courtAdminUser: {
    email: process.env.COURTADMIN_SWANSEA_TESTUSER,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  judgeUserOne: {
    email: '4923952EMP-@ejudiciary.net',
    password: judgeDefaultPassword
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications',
    caseState: 'Submitted',
    applicationType: 'C100'
  },

  baseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './functional-output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false,
  TestRetryScenarios: 3
};
