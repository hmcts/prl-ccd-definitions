
// in this file you can append custom step methods to 'I' object
const config = require('./config');
const I = actor();

module.exports = () => {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    loginToAdminConsole() {
      I.amOnPage(`${process.env.CCD_ADMIN_URL}`);
      I.see('Sign in');
      I.fillField('username', config.legalProfessionalUserOne.email);
      I.fillField('password', config.legalProfessionalUserOne.password);
      I.click('Sign in');
      I.wait('15');
      I.see('Welcome to CCD Admin Web');
      
    },
    createRole(role) {
      I.click('Manage User Roles');
      I.wait('10');
      I.click('Create User Role');
      I.wait('10');
      I.fillField('role', role);
      I.click('Create');
      I.wait('5');
    },
    uploadConfig(path) {
      I.click('Import Case Definition');
      I.wait('10');
      I.attachFile('file', path);
      I.wait('10');
      I.click('Submit');
    }
  });
};
