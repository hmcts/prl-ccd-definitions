const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    countyCourt: '#submitCountyCourtSelection',
    submit: 'button[type="submit"]'
  },
  
   async triggerEvent() {
    await I.triggerEvent('Statement of truth and submit');
  },
  
  async completeSoTPage() {
//     await I.waitForText('Statement of Truth and submit');
    I.wait('2');
    await I.click('#fl401StmtOfTruth_applicantConsent-fl401Consent');
    await I.retry(retryCount).fillField('#dateOfBirth-day', '10');
    await I.retry(retryCount).fillField('#dateOfBirth-month', '10');
    await I.retry(retryCount).fillField('#dateOfBirth-year', '2010');
    await I.fillField('#fl401StmtOfTruth_fullname', 'Test Name');
    await I.fillField('#fl401StmtOfTruth_nameOfFirm', 'Test Firm');
    await I.fillField('#fl401StmtOfTruth_signOnBehalf', 'Test OnBehalfName');
    await I.click('Continue');
    I.wait('2');
    await I.click('#fl401ConfidentialityCheck_confidentialityConsent-fl401ConfidentialConsent');
    await I.click('Continue');
    I.wait('2');
    await I.retry(retryCount).selectOption(this.fields.countyCourt, 'family.swansea.countycourt@justice.gov.uk');
    await I.click('Continue');
    
    I.wait('3');
    await I.click(this.fields.submit);
  },
  
  async submitStatementOfTruth() {
    await this.triggerEvent();
    await this.completeSoTPage();
//     await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
