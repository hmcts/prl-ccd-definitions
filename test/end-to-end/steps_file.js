// in this file you can append custom step methods to 'I' object

const { waitForPage } = require('./pages/common/common');
const { createCase } = require('./pages/create-case/create-case');
const { addNewDocument, uploadDocuments } = require('./pages/upload-documents/upload-documents');

module.exports = () => {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    loginAsSolicitor() {
      this.amOnPage(`${process.env.CCD_URL}`);
      this.wait('5');
      this.waitForText('Email address', '30');
      this.click('#cookie-accept-submit');
      this.fillField('username', 'fprl_caseworker_solicitor@mailinator.com');
      this.fillField('password', 'Nagoya0102');
      this.click('Sign in');
      this.wait('5');
    },
    createCase,
    waitForPage,
    addNewDocument,
    uploadDocuments,

    safeguardingAndRiskOfHarm() {
      this.click('#next-step').selectByVisibleText('Safeguarding and risk of harm');
    }
  });
};
