const defaultPassword = 'Nagoya0102';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl_aat@mailinator.com',
    password: defaultPassword
  },

  baseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases',
}