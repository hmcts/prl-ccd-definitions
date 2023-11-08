
module.exports => {
  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  legalProfessionalUserTwo: {
    email: 'prl_ctscadmin11_stoke@justice.gov.uk',
    password: defaultPassword
  },
  respondentSolicitor: {
    email: 'prl_aat_res_solicitor_2@mailinator.com',
    password: defaultPassword
  },
  courtAdminUser: {
    email: 'prl_aat_swansea_courtadmin@justice.gov.uk',
    password: defaultPassword
  },
  judgeUserOne: {
    email: process.env.JUDGE_TESTUSER_ONE,
    password: process.env.JUDGE_TESTPASSWORD
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
