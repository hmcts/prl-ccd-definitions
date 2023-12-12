
module.exports = {
  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE || 'prl-e2etestsolicitor@mailinator.com',
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE || 'Nagoya0102'
  },
  legalProfessionalUserTwo: {
    email: process.env.COURTADMIN_TESTUSER_ONE || 'prl_ctscadmin11_stoke@justice.gov.uk',
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE || 'Nagoya0102'
  },
  respondentSolicitor: {
    email: process.env.LEGALPROFESSIONAL_RESPONDENT_TESTUSER || 'prl_aat_res_solicitor_2@mailinator.com',
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE || 'Nagoya0102'
  },
  courtAdminUser: {
    email: process.env.COURTADMIN_SWANSEA_TESTUSER || 'prl_aat_swansea_courtadmin@justice.gov.uk',
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE || 'Nagoya0102'
  },
  judgeUserOne: {
    email: process.env.JUDGE_TESTUSER_ONE || '4923952EMP-@ejudiciary.net',
    password: process.env.JUDGE_TESTPASSWORD || 'Hmcts1234'
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
