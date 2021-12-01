const I = actor();

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    applicantAddress: 'Applicants_0_Address_Address',
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
    await I.fillField('//input[@id="Applicants_0_FirstName"]', 'Applicant Firstname');
    I.wait('2');
    await I.fillField('//input[@id="Applicants_0_LastName"]', 'Applicant Lastname');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-month"]', '10');
    await I.retry(retryCount).fillField('//input[@id="DateOfBirth-year"]', '1990');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_Gender-male"]');
    await I.fillField('//input[@id="Applicants_0_PlaceOfBirth"]', 'London');
    await I.selectPostCodeLookupAddress(this.fields.applicantAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsAtAddressLessThan5Years_Yes"]');
    I.wait('1');
    await I.retry(retryCount).fillField('//*[@id="Applicants_0_AddressLivedLessThan5YearsDetails"]', 'Same address for last 5 years');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_CanYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="Applicants_0_Email"]', 'applicant@gmail.com');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="Applicants_0_PhoneNumber"]', '4334646456456');
    await I.retry(retryCount).checkOption('//input[@id="Applicants_0_IsPhoneNumberConfidential_Yes"]');
    await I.wait('1');
    await I.fillField('//input[@id="Applicants_0_RepresentativeFirstName"]', 'James');
    await I.fillField('//input[@id="Applicants_0_RepresentativeLastName"]', 'Bond');
    await I.fillField('//input[@id="Applicants_0_SolicitorEmail"]', 'test@example.com');
    await this.searchAndSelectGivenRegisteredOrganisation();
    I.wait('2');
    await I.click('Continue');
  },

  async runApplicantDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillApplicantsPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
