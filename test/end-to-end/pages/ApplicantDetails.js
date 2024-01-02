const I = actor();
const retryCount = 3;

module.exports = {

  fields: {
    submit: 'button[type="submit"]',
    applicantAddress: 'applicants_0_address_address',
    applicantAddressFL401: 'applicantsFL401_address_address',
    organisation: 'AAT'
  },

  async triggerEvent() {
    await I.triggerEvent('Applicant details');
  },

  async searchAndSelectGivenRegisteredOrganisation() {
    await I.waitForEnabled('#search-org-text');
    await I.wait('2');
    await I.retry(retryCount).fillField('#search-org-text', this.fields.organisation);
    await I.wait('2');
    await I.retry(retryCount).click(locate('a').withText('Select')
      .inside(locate('#organisation-table')));
  },

  async fillApplicantsPage() {
    await I.wait('6');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_firstName"]', 'Applicant Firstname');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_lastName"]', 'Applicant Lastname');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '10');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '1990');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_gender-male"]');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_placeOfBirth"]', 'London');
    await I.selectPostCodeLookupAddress(this.fields.applicantAddress, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isAtAddressLessThan5Years_Yes"]');
    await I.retry(retryCount).fillField('//*[@id="applicants_0_addressLivedLessThan5YearsDetails"]', 'Same address for last 5 years');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_email"]', 'applicant@gmail.com');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_phoneNumber"]', '44646456456');
    await I.retry(retryCount).checkOption('//input[@id="applicants_0_isPhoneNumberConfidential_Yes"]');

    await I.retry(retryCount).fillField('//input[@id="applicants_0_representativeFirstName"]', 'Ted');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_representativeLastName"]', 'Robinson');
    await I.retry(retryCount).fillField('//input[@id="applicants_0_solicitorEmail"]', 'test@example.com');
    await this.searchAndSelectGivenRegisteredOrganisation();
    await I.runAccessibilityTest();
    await I.waitForText('Add new');
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async fillApplicantsPageFL401() {
    await I.waitForElement('//input[@id="applicantsFL401_firstName"]');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_firstName"]', 'Applicant Firstname');
    await I.wait('2');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_lastName"]', 'Applicant Lastname');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-day"]', '21');
    await I.wait('1');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-month"]', '12');
    await I.wait('1');
    await I.retry(retryCount).fillField('//input[@id="dateOfBirth-year"]', '2000');
    await I.retry(retryCount).checkOption('//input[@id="applicantsFL401_gender-male"]');
    await I.selectPostCodeLookupAddress(this.fields.applicantAddressFL401, 'B11LS');
    await I.retry(retryCount).checkOption('//input[@id="applicantsFL401_isAddressConfidential_Yes"]');
    await I.retry(retryCount).checkOption('//input[@id="applicantsFL401_canYouProvideEmailAddress_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_email"]', 'applicant401@gmail.com');
    await I.retry(retryCount).checkOption('//input[@id="applicantsFL401_isEmailAddressConfidential_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_phoneNumber"]', '434646456456');
    await I.retry(retryCount).checkOption('//input[@id="applicantsFL401_isPhoneNumberConfidential_Yes"]');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_representativeFirstName"]', 'Ted');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_representativeLastName"]', 'Robinson');
    await I.retry(retryCount).fillField('//input[@id="applicantsFL401_solicitorEmail"]', 'test@example.com');
    await I.retry(retryCount).fillField('#applicantsFL401_solicitorTelephone', '0204344643');
    await this.searchAndSelectGivenRegisteredOrganisation();
    I.wait('2');
    await I.runAccessibilityTest();
    await I.wait('2');
    await I.retry(retryCount).click(this.fields.submit);
  },

  async runApplicantDetailsEventHappyPath() {
    await this.triggerEvent();
    await this.fillApplicantsPage();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  },

  async runApplicantDetailsFL401EventHappyPath() {
    await this.triggerEvent();
    await this.fillApplicantsPageFL401();
    await I.submitEvent();
    await I.amOnHistoryPageWithSuccessNotification();
  }
};
