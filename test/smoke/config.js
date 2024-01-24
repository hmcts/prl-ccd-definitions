
module.exports = {
  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE,
    password: process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications',
    caseName: 'Test Child'
  },

  baseUrl: process.env.XUI_WEB_URL || 'https://manage-case.aat.platform.hmcts.net/cases'
};
