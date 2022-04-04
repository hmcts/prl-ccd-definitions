const defaultPassword = 'Nagoya0102';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl-e2etestsolicitor@mailinator.com',
    password: defaultPassword
  },

  baseUrl: process.env.XUI_WEB_URL || 'https://manage-case.aat.platform.hmcts.net/cases'
};
