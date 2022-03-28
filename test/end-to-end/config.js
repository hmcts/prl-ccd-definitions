const defaultPassword = 'Nagoya0102';

module.exports = {
  legalProfessionalUserOne: {
    email: 'prl-e2etestsolicitor@mailinator.com',
    password: defaultPassword
  },

  baseUrl: process.env.URL || 'https://xui-prl-ccd-definitions-pr-274.service.core-compute-preview.internal/',
  TestOutputDir: process.env.E2E_OUTPUT_DIR || './output',
  TestForAccessibility: process.env.TEST_ACCESSIBILITY || true
};
