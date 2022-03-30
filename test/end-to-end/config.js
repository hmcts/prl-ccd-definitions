const defaultPassword = 'Nagoya0102';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl-e2etestsolicitor@mailinator.com',
    password: defaultPassword
  },
  definition: {
    jurisdiction: 'PRIVATELAW',
    jurisdictionFullDesc: 'Family Private Law',
    caseType: 'PRLAPPS',
    caseTypeFullDesc: 'C100 & FL401 Applications'
  },

  baseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases'
};
