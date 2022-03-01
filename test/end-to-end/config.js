const defaultPassword = 'Nagoya0102';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl-e2etestsolicitor@mailinator.com',
    password: defaultPassword
  },
  
  testCourtAdminUserOne: {
    email: 'fprl_caseworker_courtadm@mailinator.com',
    password: defaultPassword
  },
  
  testCourtAdminUserTwo: {
    email: 'fprl_caseworker_courtadm_test@mailinator.com',
    password: defaultPassword
  },
  
  baseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases'
};
