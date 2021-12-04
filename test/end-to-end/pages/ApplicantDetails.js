const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    applicantAddress: 'applicants_0_address_address'
    organisation: 'AAT'
  },

  async triggerEvent() {
    await I.triggerEvent('Applicant details');
  },
  async searchAndSelectGivenRegisteredOrganisation() {
    await I.waitForEnabled('#search-org-text');
    await I.wait('2');
    await I.fillField('#search-org-text', this.fields.organisation);
    await I.wait('2');
    await I.click(locate('a').withText('Select')
      .inside(locate('#organisation-table').withDescendant(locate('h3').withText(this.fields.organisation))));
  },
  async fillApplicantsPage() {
    const retryCount = 3;
    I.wait('2');
    await I.click('Add new');
    await I.fillField('//input[@id="applicants_0_firstName"]', 'Applicant Firstname');
    I.wait('2');
    await I.fillField('//input[@id="applicants_0_lastName"]', 'Applicant Lastname');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '1990');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_gender-male"]');
    await I.fillField('//input[@id="applicants_0_placeOfBirth"]', 'London');
    await I.selectPostCodeLookupAddress(this.fields.applicantAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isAtAddressLessThan5Years_Yes"]');
    I.wait('1');
    await I.retry(retryCount).fillField('//*[@id="applicants_0_addressLivedLessThan5YearsDetails"]', 'Same address for last 5 years');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_email"]', 'applicant@gmail.com');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_phoneNumber"]', '4334646456456');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isPhoneNumberConfidential_Yes"]');
    await I.click(this.fields.submit);
  },

  async runApplicantDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillApplicantsPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
