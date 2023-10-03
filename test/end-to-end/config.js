module.exports = {
  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  legalProfessionalUserTwo: {
    email: process.env.COURTADMIN_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  judgeUserOne: {
    email: process.env.JUDGE_TESTUSER_ONE,
    password: process.env.JUDGE_TESTPASSWORD
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
