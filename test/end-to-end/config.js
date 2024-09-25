
module.exports = {
  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
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
  caseManagerUser: {
    email: process.env.CASEMANAGER_TESTUSER,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  judgeUserOne: {
    email: process.env.JUDGE_TESTUSER_ONE,
    password: process.env.JUDGE_TESTPASSWORD
  },
  legalAdviserUserOne: {
    email: process.env.LEGALADVISER_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  oldCourtAdminUser: {
    email: process.env.OLDCOURTADMIN_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  cafcassUser: {
    email: process.env.CAFCASS_USER_EMAIL,
    password: process.env.CAFCASS_USER_PASSWORD
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
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TESTS_FOR_ACCESSIBILITY || false,
  runningEnv: process.env.ENVIRONMENT,
  // eslint-disable-next-line no-magic-numbers
  TestRetryScenarios: process.env.RETRY_SCENARIO ? parseInt(process.env.RETRY_SCENARIO) : 3
};
