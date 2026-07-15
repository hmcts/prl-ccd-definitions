const defaultPassword = process.env.LEGALPROFESSIONAL_TESTPASSWORD_ONE;

module.exports = {
  legalProfessionalUserOne: {
    email: process.env.LEGALPROFESSIONAL_TESTUSER_ONE,
    password: defaultPassword
  }
};
